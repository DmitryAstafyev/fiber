#[path = "../producer/src/lib.rs"]
pub mod producer;

use fiber_transport_server::server::Server;
use producer::UserJoinObserver::{
    Observer as UserJoinObserver, ObserverRequest as UserJoinObserverRequest,
};
use producer::UserSignInObserver::{
    Observer as UserSignInObserver, ObserverRequest as UserSignInObserverRequest,
};

use producer::*;
use std::sync::{Arc, RwLock};
use std::thread::spawn;

#[derive(Clone)]
struct CustomContext {}

impl CustomContext {}

type WrappedCustomContext = Arc<RwLock<CustomContext>>;

struct ProducerInstance {}

impl Producer<Server, WrappedCustomContext> for ProducerInstance {}

#[allow(unused_variables)]
impl UserJoinObserver for UserJoinObserverRequest {
    fn conclusion<WrappedCustomContext>(
        request: producer::protocol::UserJoin::Request,
        cx: &dyn producer::consumer_context::Context,
        ucx: WrappedCustomContext,
    ) -> Result<producer::UserJoinObserver::Conclusion, String> {
        println!("GOOOD");
        Err(String::from("conclusion method isn't implemented"))
    }
}

#[allow(unused_variables)]
impl UserSignInObserver for UserSignInObserverRequest {
    fn conclusion<WrappedCustomContext>(
        request: producer::protocol::UserSignIn::Request,
        cx: &dyn producer::consumer_context::Context,
        ucx: WrappedCustomContext,
    ) -> Result<producer::UserSignInObserver::Conclusion, String> {
        println!("GOOOD");
        Err(String::from("conclusion method isn't implemented"))
    }
}

fn main() {

    spawn(move || {
        let server: Server = Server::new(String::from("127.0.0.1:8080"));
        let ucx = CustomContext {};
        // let mut producer: ProducerInstance = ProducerInstance {};
        let _feedback = match ProducerInstance::listen(server, Arc::new(RwLock::new(ucx)), None) {
            Ok(feedback) => feedback,
            Err(e) => panic!(e),
        };
    });
}
