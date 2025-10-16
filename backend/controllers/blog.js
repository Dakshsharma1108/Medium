const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const CreateBlog = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.auth.userId;
  console.log(userId);
  try {
    const blog = await prisma.post.create({
      data: {
        title,
        content,
        authorId: userId,
        published:true
      },
    });
    res.json({
      message:"Blog published Successfully"
    });
  } catch (error) {
    res.status(500).json({ message: "Invalid Inputs" });
  }
};

const GetBlogs = async (req, res) => {
  try {
    const blogs = await prisma.post.findMany({
      where: { published: true },
      include: { author: { select: { name: true } } },
    });
    res.json(blogs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching blogs", error: error.message });
  }
};

const PublishBlog = async (req, res) => {
  try {
    const { id } = req.query;
    const blog = await prisma.post.update({
      where: { id },
      data: { published: true },
    });
    res.json(blog, {
      message: "Blog published successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in publishing blog", error: error.message });
  }
};

const GetBlog = async (req, res) => {
  
    if (!req.params.id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const Id = req.params.id;
  //   try {
  //   const blogs = await prisma.post.findMany({
  //     where: { id: Id },
  //     include: { author: { select: { name: true } } },
  //   });
  //   res.json(blogs);
  // } catch (error) {
  //   res
  //     .status(500)
  //     .json({ message: "Error fetching user's blogs", error: error.message });
  // }
  try {
        const blog = await prisma.post.findUnique({
            where: {
                id: Id
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
    
        res.status(200).json({
            blog
        });
    } catch(e) {
        res.status(411).json({
            message: "Error while fetching blog post"
        });
    }
};

module.exports = { CreateBlog, GetBlogs, GetBlog, PublishBlog };
