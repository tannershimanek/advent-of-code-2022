use std::fs;

fn main() {
    let filepath = "./data.txt";
    let filedata: String = read_file_string(filepath).unwrap();

    let lines: Vec<Vec<i32>> = filedata
        .split("\n\n")
        .map(|line: &str| line.split("\n").collect::<Vec<&str>>())
        .map(|line: Vec<&str>| {
            line.iter()
                .map(|l: &&str| l.parse::<i32>().unwrap())
                .collect::<Vec<i32>>()
        })
        .collect();

    let mut vals: Vec<i32> = lines
        .iter()
        .map(|line: &Vec<i32>| line.iter().sum::<i32>())
        .collect::<Vec<i32>>();

    vals.sort_by(|a, b| a.cmp(b));

    println!("{:?}", part_one(&vals));
}