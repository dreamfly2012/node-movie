-- MySQL dump 10.13  Distrib 8.0.12, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: nodeweb
-- ------------------------------------------------------
-- Server version	8.0.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `nodeweb`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `nodeweb` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;

USE `nodeweb`;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '分类名',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='分类表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'经典'),(2,'科幻'),(3,'爱情');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` tinyint(4) NOT NULL COMMENT '文章类型',
  `title` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '文章标题',
  `summary` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '文章简介',
  `content` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '文章内容',
  `addtime` datetime NOT NULL COMMENT '添加时间',
  `updatetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `status` tinyint(4) NOT NULL COMMENT '状态0正常1删除',
  `cover` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '封面图路径',
  `spam` tinyint(4) NOT NULL DEFAULT '1' COMMENT '草稿0是，1不是',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='文章表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,1,'谁是下一个你','在雷霆再次痛失总决赛的机会后，杜兰特是否还会继续留在雷霆，我们不得而知，但是如果雷霆再没有作为的话，他们将对杜兰特的离开不远了','有人说，雷霆足够伟大，只不过勇士更强了一点。被3比1逆转之后，西决抢七或许就是杜兰特代表雷霆打的最后一场比赛。作为今年自由球员市场上的大鱼，杜兰特的去向牵挂着众多球迷的心。从目前的资料来看，凯尔特人无疑是众多追求者中的领跑之队。','2016-06-01 08:00:34','2016-06-01 10:25:01',0,'',1),(2,1,'孔雀翎','本剧讲述两位杀手背叛组织，结为生死之交。其中一位回归家族，另一位归隐农田。之后组织派出最强杀手前来灭门，于是展开了殊死搏斗。','威震江湖的孔雀山庄，数百年来以镇庄之宝“孔雀翎”独步天下，历任庄主都是武功深不可测，平日深居简出，轻易不涉足江湖，却是武林正道仰之弥高、邪道闻名丧胆的正义基石。\r\n《七种武器之孔雀翎》剧照\r\n《七种武器之孔雀翎》剧照 (25张)\r\n 谁也不知道，“孔雀翎”其实早在数十年前已神秘丢失。幸好新一代的少庄主秋凤梧智勇双全，为了继承孔雀山庄的百年声誉，不负武林正道所托，以茶楼店小二“小武”的身份，打入庞大的黑恶势力“青龙会”，潜伏在杀手组织中。他一面策反奇才异能之士，一面联络各门派后起之秀，先从敌人内部挑起矛盾，破坏了他们吞并南、北十大镖局垄断财货运输的阴谋，再寻根探源揪出幕后黑手，一举瓦解了青龙会。证明了团结的正义之士凭着信心和勇气，不需要依赖“孔雀翎”这种高端武器，照样能达到惩奸除恶、以正胜邪的最后目标。','2016-06-01 08:00:34','2016-06-03 03:41:32',0,'',1),(4,1,'肖申克的救赎','一部关于希望与自由的电影，安迪用二十年默默凿穿的不只是监狱的石墙，更是人心的高墙。','<p><img src=\"/static/images/movie-shawshank.jpg\" style=\"max-width:100%;border-radius:8px;\" /></p><h3>影片信息</h3><p>导演：弗兰克·德拉邦特 ｜ 主演：蒂姆·罗宾斯、摩根·弗里曼 ｜ 上映：1994 ｜ 时长：142 分钟</p><h3>影评</h3><p>有人把《肖申克的救赎》列为影史第一，这并非虚名。它讲的不是越狱，而是人在绝望之中如何守住内心的一点点光。安迪身陷冤狱，却从未让体制化吞噬自己——他用一把小锤，二十多年凿穿那堵墙，也凿穿了这个故事里所有角色对自由的麻木。</p><p>瑞德第一次提到希望时说别浪费时间，可影片结尾他沿着安迪留给他那条路走向太平洋，才发现希望是美好的事物，也许是世间最美好的事物。这种从麻木到重生的弧线，正是全片最动人的地方。</p><p>它适合每一个在低谷里需要一点力量的人。你点开它，往往不是为了看故事，而是为了被它托住一会儿。</p>','2026-10-01 08:20:00','2026-10-19 07:55:12',0,'/static/images/movie-shawshank.jpg',1),(5,1,'盗梦空间','一层套一层的梦境，分不清哪个是真实哪个是梦境的，诺兰把现实本身变成了最大的悬念。','<p><img src=\"/static/images/movie-inception.jpg\" style=\"max-width:100%;border-radius:8px;\" /></p><h3>影片信息</h3><p>导演：克里斯托弗·诺兰 ｜ 主演：莱昂纳多·迪卡普里奥、渡边谦 ｜ 上映：2010 ｜ 时长：148 分钟</p><h3>影评</h3><p>《盗梦空间》最聪明之处，是它不让你在任何一层睡踏实。每一层梦的物理规则都不一样，重力可以倾斜、时间可以拉伸，观众的注意力被逼着全程紧绷。而真正的高明在结尾：那个不停旋转的陀螺。</p><p>诺兰故意不给答案——陀螺倒下的那一声，是全片最后一帧。你是该信它真的倒了，还是该信它只是看着像倒了？两种读法都站得住，而这恰恰是诺兰想留下的：关于什么是真实的争论，比一个标准答案更耐咀嚼。</p><p>它证明了科幻片可以既硬核又感性，商业与作者性并非对立。</p>','2026-10-05 10:00:00','2026-10-19 07:55:12',0,'/static/images/movie-inception.jpg',1),(6,1,'阿甘正传','一只奔跑的白鸽、一段无法掌控的人生。阿甘没有变聪明，他只是比谁都认真。','<p><img src=\"/static/images/movie-forrestgump.jpg\" style=\"max-width:100%;border-radius:8px;\" /></p><h3>影片信息</h3><p>导演：罗伯特·泽米吉斯 ｜ 主演：汤姆·汉克斯、罗宾·赖特 ｜ 上映：1994 ｜ 时长：142 分钟</p><h3>影评</h3><p>阿甘的智商可能只有 75，却看懂了比他周围许多人都没看懂的东西：什么是爱，什么是一生的承诺。影片用他的慢去撞世界的快，反而显出一种罕见的纯粹。</p><p>那只在风暴里穿越、最终落在阿甘脚边的羽毛，是整部电影最温柔的隐喻——你以为人生是随机漂流，但它也许有自己的方向。汉克斯在站台上的等待，几乎成了几代人关于放下的共同记忆。</p><p>它不复杂，却很难忘。这种简单而动人，本身就是极高的技艺。</p>','2026-10-09 15:30:00','2026-10-19 07:55:12',0,'/static/images/movie-forrestgump.jpg',1),(7,2,'星际穿越','爱是唯一能跨越时间与维度的东西。硬科幻的壳，浪漫内核的核。','<p><img src=\"/static/images/movie-interstellar.jpg\" style=\"max-width:100%;border-radius:8px;\" /></p><h3>影片信息</h3><p>导演：克里斯托弗·诺兰 ｜ 主演：马修·麦康纳、安妮·海瑟薇 ｜ 上映：2014 ｜ 时长：169 分钟</p><h3>影评</h3><p>《星际穿越》经常被当成科学课来聊黑洞、相对论、五维，但它真正的主线其实很简单：一个父亲对女儿的承诺，如何穿越了整个时空。库珀看到二十年被浓缩成一段留言时的情绪崩塌，是全片情感的最高点。</p><p>管风琴的轰鸣、米勒星球上的孤独、那句来我这边，把父女这件再普通不过的事，放进了宇宙的尺度里。它是诺兰最软的一部，也是最让人愿意二刷的一部。</p><p>科学越硬核，那份柔软就越硌心。</p>','2026-10-12 20:10:00','2026-10-19 07:55:12',0,'/static/images/movie-interstellar.jpg',1),(8,3,'泰坦尼克号','跨越阶层的爱情放在一个注定沉没的船上，是浪漫与宿命感最经典的组合。','<p><img src=\"/static/images/movie-titanic.jpg\" style=\"max-width:100%;border-radius:8px;\" /></p><h3>影片信息</h3><p>导演：詹姆斯·卡梅隆 ｜ 主演：莱昂纳多·迪卡普里奥、凯特·温斯莱特 ｜ 上映：1997 ｜ 时长：194 分钟</p><h3>影评</h3><p>《泰坦尼克号》的伟大，在于它把爱情这件每个时代都会拍的事，装进了一场所有人都知道结局的灾难里。Jack 和 Rose 的相遇、甲板上的自由、我是全世界最幸运的人，让我爱你这几个字有了重量。</p><p>150 分钟的体量里，卡梅隆敢让灾难与情感并行不悖，沉船那一刻的技术震撼，和生还者一生的遗憾，互相成就。它几乎不需要讨论，因为每个人对它的记忆都是私人的、具体的。</p><p>它可能不是最伟大的爱情片，但一定是流传最广的那一个。</p>','2026-10-15 18:45:00','2026-10-19 07:55:12',0,'/static/images/movie-titanic.jpg',1);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '用户名',
  `password` char(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '密码',
  `lastlogin` datetime DEFAULT NULL COMMENT '上次登录时间',
  `isadmin` tinyint(4) DEFAULT '0' COMMENT '是否是管理员1是，0不是',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='用户表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','e10adc3949ba59abbe56e057f20f883e','2016-06-03 00:00:00',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'nodeweb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-19 15:59:00
