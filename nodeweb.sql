-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        5.5.40 - MySQL Community Server (GPL)
-- 服务器操作系统:                      Win32
-- HeidiSQL 版本:                  9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 导出 nodeweb 的数据库结构
CREATE DATABASE IF NOT EXISTS `nodeweb` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `nodeweb`;


-- 导出  表 nodeweb.post 结构
CREATE TABLE IF NOT EXISTS `post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` tinyint(4) NOT NULL COMMENT '文章类型',
  `title` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT '文章标题',
  `summary` varchar(500) COLLATE utf8_unicode_ci NOT NULL COMMENT '文章简介',
  `content` longtext COLLATE utf8_unicode_ci NOT NULL COMMENT '文章内容',
  `addtime` datetime NOT NULL COMMENT '添加时间',
  `updatetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `status` tinyint(4) NOT NULL COMMENT '状态0正常1删除',
  `spam` tinyint(4) NOT NULL DEFAULT '1' COMMENT '草稿0是，1不是',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='文章表';

-- 正在导出表  nodeweb.post 的数据：2 rows
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` (`id`, `type`, `title`, `summary`, `content`, `addtime`, `updatetime`, `status`, `spam`) VALUES
	(1, 1, '谁是下一个你', '在雷霆再次痛失总决赛的机会后，杜兰特是否还会继续留在雷霆，我们不得而知，但是如果雷霆再没有作为的话，他们将对杜兰特的离开不远了', '有人说，雷霆足够伟大，只不过勇士更强了一点。被3比1逆转之后，西决抢七或许就是杜兰特代表雷霆打的最后一场比赛。作为今年自由球员市场上的大鱼，杜兰特的去向牵挂着众多球迷的心。从目前的资料来看，凯尔特人无疑是众多追求者中的领跑之队。', '2016-06-01 08:00:34', '2016-06-01 18:25:01', 0, 1),
	(2, 1, '孔雀翎', '本剧讲述两位杀手背叛组织，结为生死之交。其中一位回归家族，另一位归隐农田。之后组织派出最强杀手前来灭门，于是展开了殊死搏斗。', '威震江湖的孔雀山庄，数百年来以镇庄之宝“孔雀翎”独步天下，历任庄主都是武功深不可测，平日深居简出，轻易不涉足江湖，却是武林正道仰之弥高、邪道闻名丧胆的正义基石。\r\n《七种武器之孔雀翎》剧照\r\n《七种武器之孔雀翎》剧照 (25张)\r\n 谁也不知道，“孔雀翎”其实早在数十年前已神秘丢失。幸好新一代的少庄主秋凤梧智勇双全，为了继承孔雀山庄的百年声誉，不负武林正道所托，以茶楼店小二“小武”的身份，打入庞大的黑恶势力“青龙会”，潜伏在杀手组织中。他一面策反奇才异能之士，一面联络各门派后起之秀，先从敌人内部挑起矛盾，破坏了他们吞并南、北十大镖局垄断财货运输的阴谋，再寻根探源揪出幕后黑手，一举瓦解了青龙会。证明了团结的正义之士凭着信心和勇气，不需要依赖“孔雀翎”这种高端武器，照样能达到惩奸除恶、以正胜邪的最后目标。', '2016-06-01 08:00:34', '2016-06-03 11:41:32', 0, 1);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;


-- 导出  表 nodeweb.user 结构
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '用户名',
  `password` char(50) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '密码',
  `lastlogin` datetime DEFAULT NULL COMMENT '上次登录时间',
  `isadmin` tinyint(4) DEFAULT '0' COMMENT '是否是管理员1是，0不是',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='用户表';

-- 正在导出表  nodeweb.user 的数据：1 rows
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `username`, `password`, `lastlogin`, `isadmin`) VALUES
	(1, 'dreamfly', '1408a7976f9bcf6c74f1c9aa0621d299', '2016-06-03 00:00:00', 1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
