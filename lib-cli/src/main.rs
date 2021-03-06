#[path = "./ctrl.args.rs"]
pub mod ctrlargs;

#[path = "./helpers/helpers.rs"]
pub mod helpers;

#[path = "./parser/parser.rs"]
pub mod parser;

#[path = "./render/render.rs"]
pub mod render;

#[macro_export]
macro_rules! stop {
    ($($arg:tt)*) => {{
        eprint!($($arg)*);
        //eprint!($crate::fmt::format($crate::__export::format_args!($($arg)*)));
        std::process::exit(1);
    }}
}

fn main() {
    let ctrl: ctrlargs::CtrlArgs = ctrlargs::CtrlArgs::new();
    match ctrl.errors() {
        Ok(_) => {},
        Err(_) => std::process::exit(1),
    }
    if let Err(errors) = ctrl.actions() {
        println!("{}", errors.join("\n"))
    }
}

#[cfg(test)]
mod tests {
    use super::parser::{ Parser };
    use super::render::rust::{ RustRender };
    use super::render::{ Render };

    #[test]
    fn parsing() {
        if let Ok(exe) = std::env::current_exe() {
            if let Some(path) = exe.as_path().parent() {
                let src = path.join("../../../test/protocol.prot");
                let mut parser: Parser = Parser::new(src);
                match parser.parse() {
                    Ok(store) => {
                        // println!("{:?}", store.groups);
                        let rust_render: RustRender = RustRender::new(true);
                        println!("{}", rust_render.render(store));
                        assert_eq!(true, true);
                    },
                    Err(e) => {
                        println!("{}", e[0]);
                        assert_eq!(true, false);
                    }
                }        
            }
        }
    }

}
