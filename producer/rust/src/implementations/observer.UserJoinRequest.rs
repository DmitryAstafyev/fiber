use super::consumer_context::{Context, Encodable};
use super::observer::{ ConfirmedRequestObserver };
use super::DeclUserJoinRequest::{ UserJoinObserver, UserJoinConclusion };
use super::consumer_identification::EFilterMatchCondition;
use super::{ Broadcasting };
use std::collections::HashMap;

#[derive(Debug, Clone)]
pub struct UserJoinRequest {
    pub login: String,
    pub email: String,
}

#[derive(Debug, Clone)]
pub struct UserJoinResponse {
    error: Option<String>,
}

impl Encodable for UserJoinResponse {
    fn abduct(&mut self) -> Result<Vec<u8>, String> {
        Ok(vec![])
    }
}

#[derive(Debug, Clone)]
pub struct ObserverRequest {

}

impl ObserverRequest {

    pub fn new() -> Self {
        ObserverRequest {}
    }

}

impl ConfirmedRequestObserver<UserJoinRequest, UserJoinResponse, UserJoinConclusion> for ObserverRequest {

    fn conclusion(
        &mut self,
        request: UserJoinRequest,
        cx: &dyn Context,
    ) -> Result<UserJoinConclusion, String> {
        Ok(UserJoinConclusion::Accept)
    }

    fn response(
        &mut self,
        request: UserJoinRequest,
        cx: &dyn Context,
        conclusion: UserJoinConclusion,
    ) -> Result<UserJoinResponse, String> {
        Ok(UserJoinResponse { error: None })
    }
}

impl UserJoinObserver<UserJoinRequest, UserJoinResponse, UserJoinConclusion> for ObserverRequest {

    fn accept(
        &mut self,
        cx: &dyn Context,
        request: UserJoinRequest,
    ) -> Result<(), String> {
        Ok(())
    }

    fn broadcast(
        &mut self,
        cx: &dyn Context,
        request: UserJoinRequest,
        broadcast: &dyn Fn(HashMap<String, String>, EFilterMatchCondition, Broadcasting) -> Result<(), String>,
    ) -> Result<(), String> {
        Ok(())
    }

    fn deny(
        &mut self,
        cx: &dyn Context,
        request: UserJoinRequest,
    ) -> Result<(), String> {
        Ok(())
    }
}
