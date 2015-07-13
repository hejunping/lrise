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

 Date: 07/10/2015 01:03:33 AM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `iorder_parcel_entry`
-- ----------------------------
DROP TABLE IF EXISTS `iorder_parcel_entry`;
CREATE TABLE `iorder_parcel_entry` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `oid` bigint(20) DEFAULT NULL COMMENT '包裹id',
  `ctime` bigint(20) DEFAULT NULL,
  `parcelid` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
