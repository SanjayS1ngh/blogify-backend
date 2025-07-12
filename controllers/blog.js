const Blog=require('../models/blog')

// async function getEditBlogPage(req,res){
//     const blogId=req.params.id;
//     const blog=await Blog.findById(blogId);
//     res.render("editBlog",{blog})
// }

async function updateBlog(req, res) {
  const blogId = req.params.id;
  const blog = await Blog.findById(blogId);

  if (!blog) return res.status(404).json({ error: "Blog not found" });
  if (blog.author.toString() !== req.user._id)
    return res.status(403).json({ error: "Not authorized to update" });

  const updated = await Blog.findByIdAndUpdate(blogId, req.body);
  return res.status(200).json({ msg: "Blog updated", blog: updated });
}


async function deleteBlog(req, res) {
  const blogId = req.params.id;
  const blog = await Blog.findById(blogId);

  if (!blog) return res.status(404).json({ error: "Blog not found" });
  if (blog.author.toString() !== req.user._id)
    return res.status(403).json({ error: "Not authorized to delete" });

  await Blog.findByIdAndDelete(blogId);
  return res.status(200).json({ msg: "Blog deleted" });
}

async function getBlogById(req,res){
    const blogId=req.params.id;
    const blog=await Blog.findById(blogId);
    // res.render("blogView",{blog})
    return res.json(blog);
}
async function homePage(req, res) {
  const allBlogs = await Blog.find({})
    .populate("author", "username") // ✅ Pulls only the username
    .sort({ createdAt: -1 });       // optional: latest first

  return res.json(allBlogs);
}

// function getNewBlogPage(req,res){
//     res.render("addBlog",{})
// }

async function createNewBlog (req,res){
    const { title, content } = req.body;
    console.log(req.file);
    const newBlog=await Blog.create({
    title,
    content,
    coverImage: req.file.path||"",
    author:req.user._id 
  });

  return res.status(201).json(newBlog);
}

module.exports={
    deleteBlog,
    homePage,
    createNewBlog,
    getBlogById,
    updateBlog
}