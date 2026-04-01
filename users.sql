set sql_safe_updates=0;
drop table if exists myusers;
create table myusers(
	UserID char(10),
    Password char(6)
);
Truncate table myusers;
insert into myusers values
('user01','123456'),
('user02','234567'),
('user03','345678'),
('user04','456789'),
('user05','567890'),
('user06','678901'),
('user07','789012'),
('user08','890123'),
('user09','901234'),
('user10','012345');
select * from myusers;

drop procedure if exists checkuser;
delimiter $$
create procedure checkuser(
	$userid char(10),
    $password char(15)
)
begin
	select * from myusers where userid=$userid and password=$password;
end $$
delimiter ;

drop procedure if exists users;
delimiter $$
create procedure users()
begin
	select * from myusers;
end $$
delimiter ;

drop procedure if exists register;
delimiter $$
create procedure register(
	$userid char(10),
    $password char(15)
)
begin
	insert into myusers values ($userid,$password);
    select * from myusers;
end $$
delimiter ;
set sql_safe_updates=0;
delete from myusers where userid='user11';

drop procedure if exists changepassword;
delimiter $$
create procedure changepassword(
	$userid char(10),
    $newpassword char(10)
)
begin
	update myusers set password=$newpassword where userid=$userid;
	select * from myusers where userid=$userid;
end $$
delimiter ;
