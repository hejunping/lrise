/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50624
 Source Host           : localhost
 Source Database       : lrise

 Target Server Type    : MySQL
 Target Server Version : 50624
 File Encoding         : utf-8

 Date: 07/10/2015 01:03:25 AM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `iorder_parcel`
-- ----------------------------
DROP TABLE IF EXISTS `iorder_parcel`;
CREATE TABLE `iorder_parcel` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `ctime` bigint(20) DEFAULT NULL,
  `utime` bigint(20) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL COMMENT '6：等待付邮费 7：邮费已付 8：包裹寄出 9：确认收获 10：评价  11：完成  12 ：放弃 13：退还 14:退还成功 15：交易关闭',
  `no` varchar(128) CHARACTER SET utf8mb4 DEFAULT NULL,
  `uid` bigint(20) DEFAULT NULL,
  `money` float DEFAULT NULL,
  `address` mediumtext CHARACTER SET utf8mb4,
  `delivery` varchar(200) DEFAULT NULL COMMENT '快递',
  `weight` float(20,0) DEFAULT '0' COMMENT '物品的重量',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
