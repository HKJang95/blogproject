
CREATE DATABASE `myblog` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
/* database 생성 */

CREATE TABLE `aboutme`(id varchar(20) primary key, title varchar(600), content varchar(6000), image_src varchar(512))default character set utf8 collate utf8_unicode_ci;
/* 홈페이지 About Me (내 소개) 테이블 
id : post id
title : post title
content : post 내용
image_src : 짝이 되는 이미지
*/

CREATE TABLE `projectPost` (id varchar(32) primary key, title varchar(64), content varchar(8192), author varchar(64), thumbnail varchar(256) DEFAULT 'https://blogprojectbucket.s3.ap-northeast-2.amazonaws.com/default.jpg', postdate datetime)default character set utf8 collate utf8_unicode_ci;
/* projectPost (프로젝트 소개) 테이블
id : post id
title : post title
content : post 내용
author : 글쓴이
thumbnail : 썸네일 이미지
postdate : 글쓴 날짜 (now()만 줄것..)
*/

CREATE TABLE `user` (id varchar(32) primary key, password varchar(128) not null, date datetime)default character set utf8 collate utf8_unicode_ci;
/* user (유저) 테이블
id : user id
password : 비밀번호
date : 가입일
*/
