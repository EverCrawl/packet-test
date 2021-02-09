extern crate packet;

mod test;

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        use packet::{Reader, Writer};
        use test::*;
        let data = ComplexType {
            names: vec!["first".to_string(), "second".to_string()],
            positions: vec![Position { x: 0.0, y: 1.0 }],
            flag: Flag::B,
            values: vec![Value {
                a: 0u32,
                b: 1i32,
                c: 30u8,
                d: 100u8,
            }],
            opt: Some(0),
            opt_s: None,
            opt_e: Some(Flag::A),
        };
        let bin: &[u8] = &[
            2, 0, 0, 0, // names.len()
            5, 0, 0, 0, // names[0].len()
            102, 105, 114, 115, 116, // names[0]
            6, 0, 0, 0, // names[1].len()
            115, 101, 99, 111, 110, 100, // names[1]
            1, 0, 0, 0, // positions.len()
            0, 0, 0, 0, // positions[0].x
            0, 0, 128, 63, // positions[0].y
            2,  // flag
            1, 0, 0, 0, // values.len()
            0, 0, 0, 0, // values[0].a
            1, 0, 0, 0,   // values[0].b
            30,  // values[0].c
            100, // values[0].d
            1,   // opt == Some
            0,   // opt
            0,   // opt_s == None
            1,   // opt_e == Some
            1,   // opt_e
        ];
        {
            let mut writer = Writer::new();
            write(&mut writer, &data);
            assert_eq!(&writer.finish(), bin);
        }

        {
            let mut reader = Reader::new(bin);
            let mut actual = ComplexType::default();
            read(&mut reader, &mut actual).unwrap();
            assert_eq!(actual, data);
        }
    }
}
