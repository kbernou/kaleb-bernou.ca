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
* Parallelize the building process (not that it takes long, but we can always do better)
* Also have it move an assets folder and its contents as part of the process
* Fix generation script to support more than one level of directory
* Clean up the generation script a bit
* Clean up the Header/Footer file generation
* Maybe add some table of contents here and there
* See if the links in the header can't be made to work in the generated HTML and
when displayed in the Markdown on GitHub and such.
* Custom 404 page (and have it linked to)

## Details
Markdown files are placed into the `src` directory. When the `generate.py` 
script is ran, it looks at the folder structre of `src`, duplicates in in 
`html`, then runs `pandoc` for each markdown file in `src`. It runs `pandoc` 
such that:
* The template specified in `assets` is used
* Each file is "standalone"
* The directory structure in `html` mirrors `src`
