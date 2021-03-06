use super::consumer_context::{ Context };
use super::protocol::{ PackingStruct };
use super::observer::{ RequestObserverErrors };
use super::consumer_identification::Filter;
use super::Protocol;

#[allow(unused_variables)]
pub trait Observer
{

    fn conclusion<UCX: 'static + Sync + Send + Clone>(
        request: Protocol::Messages::Request,
        cx: &dyn Context,
        ucx: UCX,
    ) -> Result<Protocol::Messages::Response, Protocol::Messages::Err> {
        panic!("conclusion method isn't implemented");
    }

    fn Response<UCX: 'static + Sync + Send + Clone>(
        cx: &dyn Context,
        ucx: UCX,
        request: Protocol::Messages::Request,
    ) -> Result<(), String> {
        Err(String::from("accept method isn't implemented"))
    }

    fn emit<UCX: 'static + Sync + Send + Clone>(
        &self,
        cx: &dyn Context,
        ucx: UCX,
        sequence: u32,
        request: Protocol::Messages::Request,
        broadcast: &dyn Fn(Filter, Vec<u8>) -> Result<(), String>,
    ) -> Result<(), RequestObserverErrors> {
        match Self::conclusion(request.clone(), cx, ucx.clone()) {
            Ok(mut response) => match response.pack(sequence, Some(cx.uuid().to_string())) {
                Ok(buffer) => if let Err(e) = cx.send(buffer) {
                    Err(RequestObserverErrors::ResponsingError(e))
                } else {
                    Ok(())
                },
                Err(e) => Err(RequestObserverErrors::EncodingResponseError(e)),
            },
            Err(mut error) => {
                match error.pack(sequence, Some(cx.uuid().to_string())) {
                    Ok(buffer) => if let Err(e) = cx.send(buffer) {
                        Err(RequestObserverErrors::ResponsingError(e))
                    } else {
                        Ok(())
                    },
                    Err(e) => Err(RequestObserverErrors::EncodingResponseError(e)),
                }
            }
        }
    }
}

#[derive(Clone)]
pub struct ObserverRequest { }

impl ObserverRequest {
    pub fn new() -> Self {
        ObserverRequest {}
    }
}
