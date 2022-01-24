# kaleb-bernou.ca
It's my website. Revised to keep things simple.

Favicon courtesy of [Formito](https://formito.com/tools/favicon). Google Fonts, 
Balthazar.

## Building
* Ensure [`pandoc`](https://pandoc.org/) is installed
* Ensure Python >= 3.4 is installed (for `pathlib`)
* Run `python generate.py` from root dir to build the site
* Stick contents of the generated `html` directory where it's being served from
(in my case Nginx)

## TODO
* Parallelize the building process
* Also have it move an assets folder and its contents as part of the process
* Finish up the Pandoc templates
* Fix generation script to support more than one level of directory
* Get metadata going in the markdown docs
* Clean up the generation script a bit
* Empty the `html` directory before adding in the new HTML
* Clean up the Header/Footer file generation

## Details
Markdown files are placed into the `src` directory. When the `generate.py` 
script is ran, it looks at the folder structre of `src`, duplicates in in 
`html`, then runs `pandoc` for each markdown file in `src`. It runs `pandoc` 
such that:
* The template specified in `assets` is used
* Each file is "standalone"
* The directory structure in `html` mirros `src`
