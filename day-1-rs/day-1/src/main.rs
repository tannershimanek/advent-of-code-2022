use std::fs;

fn read_file_string(filepath: &str) -> Result<String, Box<dyn std::error::Error>> {
    let data = fs::read_to_string(filepath)?;
    Ok(data)
}

fn get_lines(filedata: &String) -> Vec<Vec<&str>> {
    Box::new(
        filedata
            .split("\n\n")
            .map(|line| line.split("\n").collect::<Vec<&str>>()),
    )
    .collect::<Vec<_>>()
}

fn line_to_int(lines: Vec<Vec<&str>>) -> Vec<Vec<i32>> {
    lines
        .into_iter()
        .map(|line| {
            line.iter()
                .map(|l| l.parse::<i32>().unwrap())
                .collect::<Vec<i32>>()
        })
        .collect::<Vec<_>>()
}

fn get_vals(lines: &mut &Vec<Vec<i32>>) -> Vec<i32> {
    lines.iter().map(|line| line.iter().sum::<i32>()).collect()
}

fn part_one(v: &Vec<i32>) -> &i32 {
    v.last().unwrap()
}

fn part_two(v: &Vec<i32>) -> i32 {
    v.iter().rev().take(3).sum::<i32>()
}

fn main() {
    let filepath: String = String::from("./data.txt");
    let filedata: String = read_file_string(&filepath).unwrap();

    let lines: Vec<Vec<&str>> = get_lines(&filedata);
    let lines_as_int: Vec<Vec<i32>> = line_to_int(lines);

    let mut vals: Vec<i32> = get_vals(&mut &lines_as_int);
    vals.sort_by(|a, b| a.cmp(b));

    println!("Part one: {:?}", part_one(&vals));
    println!("Part two: {:?}", part_two(&vals));
}
