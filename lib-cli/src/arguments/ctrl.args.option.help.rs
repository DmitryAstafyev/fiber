use std::path::{ Path };
use std::collections::{ HashMap };
use super::{ CtrlArg, EArgumentsNames, EArgumentsValues };
use super:: { helpers };

mod keys {
    pub const HELP: &str = "--help";
    pub const H: &str = "-h";
}

pub struct ArgsOptionHelp {
    _requested: bool,
}

impl CtrlArg for ArgsOptionHelp {

    fn new(_pwd: &Path, args: Vec<String>, mut _ctrls: &HashMap<EArgumentsNames, Box<dyn CtrlArg + 'static>>) -> Self {
        ArgsOptionHelp { 
            _requested: args.iter().any(|arg| arg == keys::HELP || arg == keys::H)
        }
    }

    fn name(&self) -> EArgumentsNames {
        EArgumentsNames::OptionHelp
    }

    fn value(&self) -> EArgumentsValues {
        EArgumentsValues::Empty(())
    }

    fn get_err(&self) -> Option<String> {
        None
    }

    fn is_action_available(&self) -> bool {
        self._requested
    }

    fn action(&self, ctrls: &HashMap<EArgumentsNames, Box<dyn CtrlArg + 'static>>) -> Result<(), String> {
        if self._requested {
            for ctrl in ctrls.values() {
                println!("{}", ctrl.as_ref().get_help());
            }
        }
        Ok(())
    }

    fn get_help(&self) -> String {
        format!("{}{}",
            helpers::output::keys(&format!("{} ({})", keys::HELP, keys::H)),
            helpers::output::desk("shows this help."),
        )
    }


}

pub fn get_cleaner() -> impl Fn(Vec<String>) -> Vec<String> {
    move |mut args: Vec<String>| {
        if let Some(index) = args.iter().position(|arg| arg == keys::HELP || arg == keys::H) {
            args.remove(index);
        }
        args
    }
}
