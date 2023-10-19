# This script processes mkdocs.yml to remove all content between every pair of "# zh.begin" and "# zh.end" annotations

mkdocs_yml_path = 'mkdocs.yml'

def remove_content(filename):
    with open(filename, 'r') as file:
        lines = file.readlines()

    begin_tag = "# zh.begin"
    end_tag = "# zh.end"
    in_zh_block = False

    with open(filename, 'w') as file:
        for line in lines:
            if line.strip() == begin_tag:
                in_zh_block = True
            elif line.strip() == end_tag:
                in_zh_block = False
            elif not in_zh_block:
                file.write(line)


remove_content(mkdocs_yml_path)
