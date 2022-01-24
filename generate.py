from pathlib import Path
import os

md_dir = "./src"
html_dir = "./html"
sub_md_dirs = next(os.walk(md_dir))[1]

# prepare the directories that the generated HTML will go into
for dir in sub_md_dirs:
    current_dir = f"{html_dir}/{dir}"
    if not os.path.exists(current_dir):
        os.makedirs(current_dir)

# generate header and footers first
os.system(
    f'pandoc \
        --lua-filter "assets/fix-links.lua" \
        --from gfm \
        --to html5 \
        --output "html/const/header.html" \
        "src/const/header.md"') 

os.system(
    f'pandoc \
        --lua-filter "assets/fix-links.lua" \
        --from gfm \
        --to html5 \
        --output "html/const/footer.html" \
        "src/const/footer.md"')

# run pandoc for each md file in the `src` dir
files = list(Path(md_dir).rglob("*.[mM][dD]"))
for file in files:
    # need to know which folder inside of src this is
    
    file_dir = str(file.parent).split("src/")
    if len(file_dir) < 2:
        file_dir = ""
    else:
        file_dir = f"{file_dir[1]}/"

    subdir = f'{html_dir}/{file_dir}/{file.stem}.html'
    
    os.system(
        f'pandoc \
            --lua-filter "assets/fix-links.lua" \
            --standalone \
            --template assets/template.html \
            --include-before html/const/header.html \
            --include-after html/const/footer.html \
            --from gfm \
            --to html5 \
            --output "{subdir}" \
            "{file}"')
