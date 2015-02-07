# Pulper

### Work. In. Progress.
This is not much more than a proof of concept at this point to try and get some work files quickfully and artfully converted. Options, customization, that sort of thing will be down the road if we think it ends up being useful. 

Right now if you want to try here's the quickstart:

````
git clone git@github.com:tylerlee/pulper.git
cd pulper
npm install
npm start
````

### The Mission

I want people in the office to go to a webpage, take their bit of text, and have it styled for them and a pretty PDF ready to go. Focus on ease of use. As a designer I'm tired of jumping into inDesign to style up a text document for a quick sendoff -- but at the same time I'm tired of seeing content goes out that isn't on our letterhead, hopefully we can chop off some low hanging fruit with pulper.

1. Drop markdown, text or html into the Pulper
2. Pulper gives you PDF

### Customization

Pulper will convert supported filetypes to a PDF easily without any options, but sometimes we need options. Pass some meta info along with your document to get some customization options (these are stil being fleshed out).

At the very top of your document include HTML comments. These are the current details that can be passed. All are optional. Defaults shown.

````
<!-- 
  layout: basic
  title: null
  pageWidth: 8.5in
  pageHeight: 11in
  pageMargin: .5in
-->
````

### Layouts

##### Skeleton 
  A simple, clean framework that will work to take your files and make them clean and printable. Based upon the Skeleton framework http://getskeleton.com/.

  ![skeleton-pulper](http://cl.ly/image/2X3g1S2T3S1K/pulper.png)
  
##### None
  Specify none and then only your content will be rendered. This is useful when you have written HTML and want to convert it directly to PDF. This allows you to do more advanced layouts.

### Customizing Layouts

Layouts are like a theme for your content. They are built with handlebars and can be customized by cloning this repo. I'd love to create some more generic themes for everyone to use but the real power of Pulper is when it gets in your hands and you create custom themes for your needs.

So maybe your company letterhead is a layout; then all you have to do is write a little markdown, drag it to pulper and you'll have a PDF ready to print or email on your company's letterhead. We use this to write technical documentation in markdown (easy for devs) but then quickly pretty-it-up for clients to read (easy on the eyes). 

To create your own layout add a ````.handlebars```` file in the ````views/layouts/themes```` folder. Follow Skeleton as a guide, it's easy. 

Then just specify that theme in the meta of the next document you drop into Pulper.

