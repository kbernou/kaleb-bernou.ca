---
title: kaleb-bernou.ca (this site)
author: Kaleb Bernou
date: 2022-01-24
---

This site has seen a few transformations over the last year. In fact it's almost
one year to the day that I picked it up and re-evaluated how I was handling it.

## Context
Initially, I wanted a site to act as a sort of resume and journal for me. I had 
just gotten myself a proper 1u server (see: [Homelab](homelab.md)) for fun and 
learning, and this seemed like a natural thing to do. At the same time, I had 
began collecting recipes that I had made and liked from all around, so it was 
also a great medium to keep them together.

The main technical goal here, is that I wanted to easily write the pages in 
Markdown, and get HTML to display. Thing is, I wanted a few extra things that
made that a little less straight forward than just running Pandoc.

## First iteration
What an ordeal. Interesting, but far from silly ideals like "simple" and "not a 
mess". Check the [last commit](https://github.com/kbernou/kaleb-bernou.ca/tree/c9d22ed12ae43ddeb0cc41d44ef9b3485fa309ba) before the great revision to see how 
that looked.

I ended up making it a NodeJS app, with Nginx acting as a reverse proxy to the 
container it was hosted in. It used Express, and A LOT of [EJS](https://ejs.co/) 
for all my fancy features. I wanted a lot of content to be dynamically derived 
or constant accross all pages. From what I can remember, this included:
* Static header and footer accross all pages (inspired by the simplicity of 
PHP's `include`)
* Page titles generated from file names
* Table of contents automatically generated from filenames in relevant 
directories, in order of creation
* "Clean" URL (IE one without any file extensions in it, just an aesthetic 
thing)

All that, and I'm pretty sure I still had to use another tool (might have even 
been Pandoc, but I also recall using a built in tool with Powershell) to convert
the Markdown into the EJS mess.

This iteration though wouldn't have been able

I learned a while after this from a comment on HackerNews about server side 
injection, but had forgotten about it when I started up version 2. That's 
alright though, I think this new method is robust enough and more self contained 
for my ~~needs~~ wants. Who knows though, I might come back in another year and 
redo the whole thing with a focus on SSI!

## Second iteration (what you're seeing now)
These days I'm trying to embrace technological simplicity a bit more, and I 
think this iteration refects that. 

I got deeper into [Pandoc](https://pandoc.org/) to generate the HTML for me, and
wrote a Python script to do a little extra legwork for me to make things easier.
With this method, I'm able to write my pages in Markdown and get HTML. 
Node is no longer required, and the mess of EJS I was working with before is no
more. I especially like that because I'm not a fan of Javascript (a burning hot
take, I know).

Initially, before the Python script came about, I wanted to use a GNUmakefile to
handle the running of Pandoc. This caused me to add "learn the basics of GNU 
Make" to my TODO list since it was way more opaque than I initially anticipated.
It's been something on my mind for a while given how useful and ubiquitous 
Makefiles are, but that's a tool I'll be adding to my belt another day. For now
I wanted the site out and about.

Getting the header with its links was a bit tricky. TODO: explain what happened

The generated HTML goes right to Nginx to be served now.

All in all: complexities have been removed, the whole process is more 
streamlined and closer to the initial vision, and I get my main objective of
Markdown-first writing.

### Drawbacks
Unfortunately, when I make a new page I have to manually add it to the table of
contents page. The humanity! There might be a way Pandoc+Markdown can help me 
with this, but I haven't looked for it yet. For now I'll just accept this 
concession, it's really not a big deal and as [Steren](https://blog.steren.fr/2020/my-stack-will-outlive-yours/) noted here (also some inspiration for this 
revision), it gives a soft way to "publish" the page. Not that anyone's looking
at my pages.
This also means that the table of contents won't necessarily be in chronological 
order. This doens't bother me so much anymore, so that too I'll live with. Same
goes for having `.html` in the url. 

## Why not GitHub pages?
Great question. That definitely would have been the absolute simplist option, 
especially since you can even direct it to a custom URL. But where's the fun in
that? I also explicitly wanted to learn a bit about what comes with hosting this
stuff yourself (being a programmer at a company with a dedicated sysadmin, I 
don't get to touch infrastructure so much, but it is interesting).

## How is it hosted?
A VM with Nginx. It reverse-proxies a few other things I got running, 
but now it's just plain serving the site for me. Deployment has yet to be 
configured automatically, but I want to have a local CI server do it for me. 
That will end up as another set of ramblings, I'm sure.

## Why not cloud?
I don't want to be reliant on a multi-billion dollar company, nor pay recurring
monthly fees no matter how small if I can avoid it. It's also immensely 
satisfying to manage everything yourself, and I love the hardware stack in the
corner humming away happily.
