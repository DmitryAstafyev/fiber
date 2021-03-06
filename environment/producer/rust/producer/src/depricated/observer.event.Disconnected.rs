use super::consumer_identification::Filter;
use super::{ tools, ConsumersChannel, broadcasting, ProducerEvents };
use fiber::logger::{ Logger };
use std::sync::mpsc;
use std::sync::mpsc::{Receiver, Sender};
use std::sync::{Arc, Mutex};
use std::thread::spawn;
use uuid::Uuid;

#[allow(unused_variables)]
pub trait Controller {
    fn disconnected<UCX: 'static + Sync + Send + Clone>(
        uuid: Uuid,
        ucx: UCX,
    ) -> Result<(), String> {
        Err(String::from("disconnected handler isn't implemented"))
    }

    fn listen<UCX: 'static + Sync + Send + Clone>(
        &mut self,
        ucx: UCX,
        consumers: Arc<Mutex<Sender<ConsumersChannel>>>,
        feedback: Sender<ProducerEvents<UCX>>,
    ) -> Result<Sender<Uuid>, String> {
        let (sender, receiver): (Sender<Uuid>, Receiver<Uuid>) = mpsc::channel();
        spawn(move || {
            loop {
                match receiver.recv() {
                    Ok(uuid) => {
                        match consumers.lock() {
                            Ok(consumers) => {
                                let broadcast = |filter: Filter, buffer: Vec<u8>| {
                                    broadcasting(consumers.clone(), filter, buffer)
                                };
                                if let Err(e) = Self::disconnected(uuid, ucx.clone()) {
                                    if let Err(e) = feedback.send(ProducerEvents::EventError(tools::logger.warn(&format!("Call disconnected handler for event due error: {}", e)))) {
                                        tools::logger.err(&format!("Fail send ProducerEvents:EventError {}", e));
                                    }
                                }
                            },
                            Err(e) => if let Err(e) = feedback.send(ProducerEvents::EventChannelError(tools::logger.err(&format!("Fail get access to consumers channel due error: {}", e)))) {
                                tools::logger.err(&format!("Fail send ProducerEvents:EventChannelError {}", e));
                            }
                        }
                        
                    },
                    Err(e) => {
                        if let Err(e) = feedback.send(ProducerEvents::EventChannelError(tools::logger.err(&format!("Fail receive event due error: {}", e)))) {
                            tools::logger.err(&format!("Fail send ProducerEvents:EventChannelError {}", e));
                        }
                        break;
                    }
                }
            }
        });
        Ok(sender)
    }
}

#[derive(Clone)]
pub struct Observer {
    sender: Option<Sender<Uuid>>,
}

impl Observer {
    pub fn new() -> Self {
        Observer { sender: None }
    }
}

