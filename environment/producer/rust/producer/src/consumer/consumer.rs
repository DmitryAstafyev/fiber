use super::consumer_context::Context;
use super::consumer_identification::{Identification, Filter};
use super::{ Protocol, ConsumersChannel };
use std::collections::HashMap;
use std::sync::mpsc::{Sender};
use std::sync::{Arc, RwLock, Mutex};
use uuid::Uuid;

pub struct Cx {
    uuid: Uuid,
    consumers: Arc<Mutex<Sender<ConsumersChannel>>>,
}

impl Context for Cx {
    fn send(&self, buffer: Vec<u8>) -> Result<(), String> {
        match self.consumers.lock() {
            Ok(consumers) => if let Err(e) = consumers.send(ConsumersChannel::SendTo((self.uuid.clone(), buffer))) {
                Err(e.to_string())
            } else {
                Ok(())
            },
            Err(e) => Err(e.to_string()),
        }
    }

    fn send_to(
        &self,
        buffer: Vec<u8>,
        filter: Filter,
    ) -> Result<(), String> {
        match self.consumers.lock() {
            Ok(consumers) => if let Err(e) = consumers.send(ConsumersChannel::SendByFilter((filter, buffer))) {
                Err(e.to_string())
            } else {
                Ok(())
            },
            Err(e) => Err(e.to_string()),
        }
    }

    fn uuid(&self) -> Uuid {
        self.uuid.clone()
    }

}

pub struct Consumer {
    uuid: Uuid,
    buffer: Protocol::Buffer<Protocol::AvailableMessages>,
    identification: Identification,
    cx: Cx,
    sender: Arc<Mutex<Sender<(Vec<u8>, Option<Uuid>)>>>,
}

impl Consumer {
    pub fn new(uuid: Uuid, consumers: Arc<Mutex<Sender<ConsumersChannel>>>, sender: Arc<Mutex<Sender<(Vec<u8>, Option<Uuid>)>>>) -> Self {
        Consumer {
            uuid,
            buffer: Protocol::Buffer::new(),
            identification: Identification::new(),
            cx: Cx {
                uuid,
                consumers,
            },
            sender,
        }
    }

    pub fn chunk(&mut self, buffer: &Vec<u8>) -> Result<(), String> {
        if let Err(e) = self.buffer.chunk(buffer) {
            Err(format!("{:?}", e))
        } else {
            Ok(())
        }
    }

    pub fn next(&mut self) -> Option<(Protocol::AvailableMessages, Protocol::PackageHeader)> {
        if let Some(msg) = self.buffer.next() {
            Some((msg.msg, msg.header))
        } else {
            None
        }
    }

    pub fn send(&self, buffer: Vec<u8>) -> Result<(), String> {
        match self.sender.lock() {
            Ok(sender) => if let Err(e) = sender.send((buffer, Some(self.uuid))) {
                    Err(e.to_string())
                } else {
                    Ok(())
            },
            Err(e) => Err(e.to_string()),
        }
    }

    pub fn send_if(
        &self,
        buffer: Vec<u8>,
        filter: Filter,
    ) -> Result<bool, String> {
        if self.identification.filter(filter) {
            if let Err(e) = self.send(buffer) {
                Err(e)
            } else {
                Ok(true)
            }
        } else {
            Ok(false)
        }
    }

    pub fn get_cx(&mut self) -> &impl Context {
        &self.cx
    }

    pub fn get_uuid(&self) -> Uuid {
        self.uuid
    }

    pub fn set_key(&mut self, key: Protocol::Identification::SelfKey) -> String {
        self.identification.key(key);
        self.uuid.to_string()
    }

    pub fn assigned(&self) -> bool {
        self.identification.assigned()
    }
}
