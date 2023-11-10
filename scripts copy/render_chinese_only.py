# This script processes mkdocs.yml to remove all content between every pair of "# en.begin" and "# en.end" annotations

mkdocs_yml_path = 'mkdocs.yml'

def remove_content(filename):
    with open(filename, 'r') as file:
        lines = file.readlines()

    begin_tag = "# en.begin"
    end_tag = "# en.end"
    in_en_block = False

    with open(filename, 'w') as file:
        for line in lines:
            if line.strip() == begin_tag:
                in_en_block = True
            elif line.strip() == end_tag:
                in_en_block = False
            elif not in_en_block:
                file.write(line)


remove_content(mkdocs_yml_path)

