# drop database if exists environment;
# create database environment;
set sql_safe_updates=0; 
use environment;  

   
# 汉字转换拼音首字母函数
drop table if exists sys_pycodes;
CREATE TABLE sys_pycodes (
  pin_yin varchar(255) CHARACTER SET gbk NOT NULL,
  code int(11) NOT NULL primary key
);
INSERT INTO sys_pycodes (pin_yin,code)  VALUES ("a", 20319),("ai", 20317),("an", 20304),("ang", 20295),("ao", 20292),("ba", 20283),("bai", 20265),("ban", 20257),("bang", 20242),("bao", 20230),("bei", 20051),("ben", 20036),("beng", 20032),("bi", 20026),("bian", 20002),("biao", 19990),("bie", 19986),("bin", 19982),("bing", 19976),("bo", 19805),("bu", 19784),("ca", 19775),("cai", 19774),("can", 19763),("cang", 19756),("cao", 19751),("ce", 19746),("ceng", 19741),("cha", 19739),("chai", 19728),("chan", 19725),("chang", 19715),("chao", 19540),("che", 19531),("chen", 19525),("cheng", 19515),("chi", 19500),("chong", 19484),("chou", 19479),("chu", 19467),("chuai", 19289),("chuan", 19288),("chuang", 19281),("chui", 19275),("chun", 19270),("chuo", 19263),("ci", 19261),("cong", 19249),("cou", 19243),("cu", 19242),("cuan", 19238),("cui", 19235),("cun", 19227),("cuo", 19224),("da", 19218),("dai", 19212),("dan", 19038),("dang", 19023),("dao", 19018),("de", 19006),("deng", 19003),("di", 18996),("dian", 18977),("diao", 18961),("die", 18952),("ding", 18783),("diu", 18774),("dong", 18773),("dou", 18763),("du", 18756),("duan", 18741),("dui", 18735),("dun", 18731),("duo", 18722),("e", 18710),("en", 18697),("er", 18696),("fa", 18526),("fan", 18518),("fang", 18501),("fei", 18490),("fen", 18478),("feng", 18463),("fo", 18448),("fou", 18447),("fu", 18446),("ga", 18239),("gai", 18237),("gan", 18231),("gang", 18220),("gao", 18211),("ge", 18201),("gei", 18184),("gen", 18183),("geng", 18181),("gong", 18012),("gou", 17997),("gu", 17988),("gua", 17970),("guai", 17964),("guan", 17961),("guang", 17950),("gui", 17947),("gun", 17931),("guo", 17928),("ha", 17922),("hai", 17759),("han", 17752),("hang", 17733),("hao", 17730),("he", 17721),("hei", 17703),("hen", 17701),("heng", 17697),("hong", 17692),("hou", 17683),("hu", 17676),("hua", 17496),("huai", 17487),("huan", 17482),("huang", 17468),("hui", 17454),("hun", 17433),("huo", 17427),("ji", 17417),("jia", 17202),("jian", 17185),("jiang", 16983),("jiao", 16970),("jie", 16942),("jin", 16915),("jing", 16733),("jiong", 16708),("jiu", 16706),("ju", 16689),("juan", 16664),("jue", 16657),("jun", 16647),("ka", 16474),("kai", 16470),("kan", 16465),("kang", 16459),("kao", 16452),("ke", 16448),("ken", 16433),("keng", 16429),("kong", 16427),("kou", 16423),("ku", 16419),("kua", 16412),("kuai", 16407),("kuan", 16403),("kuang", 16401),("kui", 16393),("kun", 16220),("kuo", 16216),("la", 16212),("lai", 16205),("lan", 16202),("lang", 16187),("lao", 16180),("le", 16171),("lei", 16169),("leng", 16158),("li", 16155),("lia", 15959),("lian", 15958),("liang", 15944),("liao", 15933),("lie", 15920),("lin", 15915),("ling", 15903),("liu", 15889),("long", 15878),("lou", 15707),("lu", 15701),("lv", 15681),("luan", 15667),("lue", 15661),("lun", 15659),("luo", 15652),("ma", 15640),("mai", 15631),("man", 15625),("mang", 15454),("mao", 15448),("me", 15436),("mei", 15435),("men", 15419),("meng", 15416),("mi", 15408),("mian", 15394),("miao", 15385),("mie", 15377),("min", 15375),("ming", 15369),("miu", 15363),("mo", 15362),("mou", 15183),("mu", 15180),("na", 15165),("nai", 15158),("nan", 15153),("nang", 15150),("nao", 15149),("ne", 15144),("nei", 15143),("nen", 15141),("neng", 15140),("ni", 15139),("nian", 15128),("niang", 15121),("niao", 15119),("nie", 15117),("nin", 15110),("ning", 15109),("niu", 14941),("nong", 14937),("nu", 14933),("nv", 14930),("nuan", 14929),("nue", 14928),("nuo", 14926),("o", 14922),("ou", 14921),("pa", 14914),("pai", 14908),("pan", 14902),("pang", 14894),("pao", 14889),("pei", 14882),("pen", 14873),("peng", 14871),("pi", 14857),("pian", 14678),("piao", 14674),("pie", 14670),("pin", 14668),("ping", 14663),("po", 14654),("pu", 14645),("qi", 14630),("qia", 14594),("qian", 14429),("qiang", 14407),("qiao", 14399),("qie", 14384),("qin", 14379),("qing", 14368),("qiong", 14355),("qiu", 14353),("qu", 14345),("quan", 14170),("que", 14159),("qun", 14151),("ran", 14149),("rang", 14145),("rao", 14140),("re", 14137),("ren", 14135),("reng", 14125),("ri", 14123),("rong", 14122),("rou", 14112),("ru", 14109),("ruan", 14099),("rui", 14097),("run", 14094),("ruo", 14092),("sa", 14090),("sai", 14087),("san", 14083),("sang", 13917),("sao", 13914),("se", 13910),("sen", 13907),("seng", 13906),("sha", 13905),("shai", 13896),("shan", 13894),("shang", 13878),("shao", 13870),("she", 13859),("shen", 13847),("sheng", 13831),("shi", 13658),("shou", 13611),("shu", 13601),("shua", 13406),("shuai", 13404),("shuan", 13400),("shuang", 13398),("shui", 13395),("shun", 13391),("shuo", 13387),("si", 13383),("song", 13367),("sou", 13359),("su", 13356),("suan", 13343),("sui", 13340),("sun", 13329),("suo", 13326),("ta", 13318),("tai", 13147),("tan", 13138),("tang", 13120),("tao", 13107),("te", 13096),("teng", 13095),("ti", 13091),("tian", 13076),("tiao", 13068),("tie", 13063),("ting", 13060),("tong", 12888),("tou", 12875),("tu", 12871),("tuan", 12860) ,("tui", 12858),("tun", 12852),("tuo", 12849),("wa", 12838),("wai", 12831),("wan", 12829),("wang", 12812),("wei", 12802),("wen", 12607),("weng", 12597),("wo", 12594),("wu", 12585),("xi", 12556),("xia", 12359),("xian", 12346),("xiang", 12320),("xiao", 12300),("xie", 12120),("xin", 12099),("xing", 12089),("xiong", 12074),("xiu", 12067),("xu", 12058),("xuan", 12039),("xue", 11867),("xun", 11861),("ya", 11847),("yan", 11831),("yang", 11798),("yao", 11781),("ye", 11604),("yi", 11589),("yin", 11536),("ying", 11358),("yo", 11340),("yong", 11339),("you", 11324),("yu", 11303),("yuan", 11097),("yue", 11077),("yun", 11067),("za", 11055),("zai", 11052),("zan", 11045),("zang", 11041),("zao", 11038),("ze", 11024),("zei", 11020),("zen", 11019),("zeng", 11018),("zha", 11014),("zhai", 10838),("zhan", 10832),("zhang", 10815),("zhao", 10800),("zhe", 10790),("zhen", 10780),("zheng", 10764),("zhi", 10587),("zhong", 10544),("zhou", 10533),("zhu", 10519),("zhua", 10331),("zhuai", 10329),("zhuan", 10328),("zhuang", 10322),("zhui", 10315),("zhun", 10309),("zhuo", 10307),("zi", 10296),("zong", 10281),("zou", 10274),("zu", 10270),("zuan", 10262),("zui", 10260),("zun", 10256),("zuo", 10254);
/* 汉语拼音首字母 */
DROP FUNCTION IF EXISTS sys_getFirstPyCode;
DELIMITER $$
CREATE FUNCTION sys_getFirstPyCode($chn VARCHAR(1000)) 
returns varchar(1000) charset utf8 DETERMINISTIC
BEGIN 
    declare rs VARCHAR(1000) default '';
    declare s1,s2 VARCHAR(2);
    declare i int default 1;
    while i<=char_length($chn) do
		set s1=UPPER(substring($chn, i, 1));
		set s2=s1;
		IF LENGTH(s1)<>CHARACTER_LENGTH(s1) THEN
			set s2=ELT(INTERVAL(CONV(HEX(CONVERT(s1 USING gbk)),16,10),
			0xB0A1,0xB0C5,0xB2C1,0xB4EE,0xB6EA,0xB7A2,0xB8C1,0xB9FE,0xBBF7,
			0xBFA6,0xC0AC,0xC2E8,0xC4C3,0xC5B6,0xC5BE,0xC6DA,0xC8BB,
			0xC8F6,0xCBFA,0xCDDA,0xCEF4,0xD1B9,0xD4D1),
			'A','B','C','D','E','F','G','H','J','K','L','M','N','O','P','Q','R','S','T','W','X','Y','Z');
		END IF;
        if (s2 is not null) then set rs=concat(rs,s2);
        else set rs=concat(rs,s1); 
        end if;
        set i=i+1;
    end while;    
    return rs;
end $$
DELIMITER ;


-- mysql自定义函数-随机生成姓名
DELIMITER $$
DROP FUNCTION IF EXISTS `rand_name`$$
CREATE FUNCTION `rand_name`() RETURNS VARCHAR(64) CHARSET utf8 deterministic
BEGIN
/*姓的随机范围145个*/
DECLARE rand_surname TEXT DEFAULT 
'赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章云苏潘葛奚范彭郎鲁韦昌马苗凤花方俞任袁柳鲍史唐费薛雷贺倪汤滕殷罗毕郝邬安常乐于时皮齐康伍顾孟平黄和穆萧尹姚邵湛汪毛禹狄米贝明臧计伏成戴谈宋茅庞熊纪舒屈项祝董梁杜阮蓝闵席季麻强贾路娄危江童颜郭梅';
/*名的随机范围99个常用汉字。*/
DECLARE rand_name TEXT DEFAULT
'子涵轩墨琪萱璇瑜晗晨曦睿智思诗书画梅兰竹菊松柏峰岚翔治俊霆建硕奕成佑豪琪润飞鸿鹏燕莺凤龙虎豹玉瑶瑾瑞祥庆贺喜悦欣怡宁安静雅丽娜婷婉娴淑贤德诚信义工和平常春夏秋冬雨雪冰冰霜露泉河海洋洋波光明星月云霞虹锦绣丝绸缎绫罗绮绚色彩';
/*姓*/
DECLARE surname VARCHAR(2) ;
/*姓的随机数1-576*/
DECLARE surname_num INT(3) DEFAULT FLOOR(RAND()*136)+1;
/*名*/
DECLARE `name` VARCHAR(14) ;
/*名的随机数1-401*/
DECLARE `name_num` INT(3) DEFAULT FLOOR(RAND()*99)+1;
DECLARE `name_num2` INT(3) DEFAULT FLOOR(RAND()*99)+1;
/*名的字数，这里设置为1-2个字。*/
DECLARE `name_no` INT(3) DEFAULT FLOOR(RAND()*2)+1;
#姓
SELECT SUBSTRING(rand_surname,surname_num,1) INTO surname;
IF name_no=1
THEN #名
SELECT SUBSTRING(rand_name,name_num,1) INTO `name`;
ELSE #名
SELECT CONCAT(SUBSTRING(rand_name,name_num,1),SUBSTRING(rand_name,name_num2,1)) INTO `name`;
END IF;
RETURN CONCAT(surname,`name`);
END$$
DELIMITER ;

-- 测试函数
SELECT rand_name();



drop function if exists mobile_rand;
delimiter $$
create function mobile_rand()
returns char(11) deterministic
begin

	declare $str char(11);
	set $str=concat('1',case floor(1+rand()*5)
		when 1 then '3'
		when 2 then '5'
        when 3 then '7'
        when 4 then '8'
        else '9'
        end,floor(100000000 + (rand()*900000000)));
		return $str;
end $$
delimiter ;

drop function if exists pays_rand;
delimiter $$
create function pays_rand()
returns char(11) deterministic
begin

	declare $str char(11);
	set $str=case floor(1+rand()*5)
		when 1 then 4500
		when 2 then 5000
        when 3 then 6000
        when 4 then 6500
        else 7000
        end;
		return $str;
end $$
delimiter ;

drop function if exists address_rand;
delimiter $$
create function address_rand()
returns varchar(100) deterministic
begin
	declare $str varchar(100);
select concat('浙江省杭州市',district,community,floor(1+rand()*48),'幢',floor(1+rand()*4),'单元',floor(1+rand()*10),0,floor(1+rand()*2),'室') into $str from address order by rand() limit 1;
		return $str;
end $$
delimiter ;

drop function if exists total;
delimiter $$
create function total($station int)
returns int deterministic
begin
	declare $str varchar(100);
select concat('浙江省杭州市',district,community,floor(1+rand()*48),'幢',floor(1+rand()*4),'单元',floor(1+rand()*10),0,floor(1+rand()*2),'室') into $str from address order by rand() limit 1;
		return $str;
end $$
delimiter ;


drop function if exists company_rand;
delimiter $$
create function company_rand()
returns char(11) deterministic
begin
	declare $str varchar(20);
	select brandname into $str from brands order by rand() limit 1;
		return $str;
end $$
delimiter ;


drop procedure if exists insert_user;
delimiter $$
create PROCEDURE insert_user(in num int)
begin
    declare i int default 0;
    set autocommit = 0;
    while i < num do
	    insert into number(number) values 
	    (rand());
	    set i = i + 1;
    end while;
    commit;
end $$
delimiter ;




drop procedure if exists demo503a;
DELIMITER $$
create procedure demo503a( #商品分页显示
	$pageno int,
    $pagesize int,
    $keyvalue varchar(255),
    $filter varchar(255)    
)
begin
	set @sql="select a.*,b.companyname as suppliername, b.address, c.categoryname, a.productid as 'key' from products a 
    join suppliers b on a.supplierid=b.supplierid join categories c using(categoryid) order by productid";	    
	call sys_gridPaging(@sql, $pageno, $pagesize,'productid',$keyvalue,'productid;productname;quantityperunit;unit;suppliername', $filter);
end $$
DELIMITER ;
#call demo503a(1,20,'33','统');


drop procedure if exists sys_gridPaging;
DELIMITER $$
CREATE PROCEDURE sys_gridPaging(
	$selectsql mediumtext,
    $pageno int,
    $pagesize int,
    $keyfield varchar(255),
    $keyvalue varchar(255),
    $fieldset varchar(500),
    $filter varchar(500)
)
begin
   	declare $wheresql mediumtext default '';
    declare $start int;
    drop temporary table if exists _tmp, _tmp1;
    set @sql=concat('create temporary table _tmp1 as ', $selectsql);
    prepare stmt from @sql;
	execute stmt;    
    set @sql=concat('create temporary table _tmp as select * from _tmp1 ');
    if ($fieldset<>'' and $filter<>'') then
		set $fieldset=concat($fieldset,';');
		while (instr($fieldset,';')>0) do
			if ($wheresql<>'') then set $wheresql=concat($wheresql, ' or ' ); end if;
			set $wheresql=concat($wheresql, substring($fieldset, 1, instr($fieldset,';')-1), ' like \'%', $filter,'%\'');
			set $fieldset=substring($fieldset, instr($fieldset, ';')+1);
		end while;
    end if;
    if ($wheresql<>'') then 
		set @sql=concat(@sql, ' where (', $wheresql,')'); 
	end if;
    prepare stmt from @sql;
	execute stmt;
    if ($keyfield<>'' and $keyvalue<>'' and $pagesize>0) then
		set @n=-1;
		set @sql=concat('select _rowno into @n from (select *, @rowno:=@rowno+1 as _rowno from _tmp a join (select @rowno:=0) as p) as t where ', $keyfield,'="', $keyvalue,'"');
        #select @sql;
		prepare stmt from @sql;
		execute stmt;
        if (@n<=0) then
			set $pageno=1;
        else
			set $pageno=floor((@n-1)/$pagesize)+1;
        end if;		
        set @m=@n-($pageno-1)*$pagesize;
    else
		set @m=0, @n=0;
    end if;
    select count(*) into @total from _tmp;
    #select @sql,@total;
    if ($pageno<1) then set $pageno=1; end if;
    if ($pagesize<=0) then set $pagesize=@total; end if;
    set $start=($pageno-1)*$pagesize;
    #set @sql=concat('select *, ', @total,' as _total,', @n, ' as _rowno, ', @m,' as _rowindex, ', $pageno,' as _pageno from _tmp');    
    set @sql=concat('select *, ', @total,' as _total,', @n, ' as _rowno, ', @m,' as _rowindex from _tmp');    
    set @sql=concat(@sql, ' limit ', $start, ',', $pagesize);
	prepare stmt from @sql;
	EXECUTE stmt;
	deallocate prepare stmt;
end$$
DELIMITER ;

drop procedure if exists demo1401a;
DELIMITER $$
create procedure demo1401a( #商品分页显示
	$pageno int,
    $pagesize int,
    $keyvalue varchar(255),
    $filter varchar(255)    
)
begin
	set @sql="select a.*,b.stationname,c.title from environment.cleaners a join environment.stations b using(stationno) join environment.titles c using(titleno)";	    
	call sys_gridPaging(@sql, $pageno, $pagesize,'cleanerno',$keyvalue,'cleanerno;cleanername;stationno;gender;stationname;title', $filter);
end $$
DELIMITER ;

call demo1401a(1,20,'33','');

drop procedure if exists demo1401b; 
delimiter $$
create procedure demo1401b(
	$data MediumText
)
begin
	call sys_runEditRow('environment.cleaners', 'cleanerno', '', $data,  @row);  #row为主键列的值，json格式
    set @s=sys_GetJsonValue(@row, '_error', 'c');
    if (@s='' or @s is null) then   
		set @s=sys_GetJsonValue(@row, 'cleanerno', 'c');  #提取主键值，n表示数值型数据
    end if ;
    #select count(*)+1 as _rowno from products where productid<@s;
end $$
delimiter ;

drop procedure if exists demo1401c; 
delimiter $$
create procedure demo1401c()
begin
	select *, stationname as stationname, concat('_',stationno) as 'key' from environment.stations;
end $$
delimiter ;


drop procedure if exists demo1803a; 
delimiter $$
create procedure demo1803a(
	$pageno int,
    $pagesize int,
    $filter varchar(255)
)
begin
	set @sql="select * from environment.sensors";
    call sys_gridPaging(@sql, $pageno, $pagesize, '','','sensorname;items;unit;upperlimit;lowerlimit', $filter);
end $$
delimiter ;

drop procedure if exists demo1803b; 
delimiter $$
create procedure demo1803b(
  $action varchar(20),  
  $data mediumtext
)
begin
	DECLARE $i INT DEFAULT 0;
	DECLARE $field, $value, $keyvalue, $keyfield VARCHAR(255);
    declare $keys,$sql1,$sql2,$sql3 mediumtext default '';
    set $keyfield='sensorno';
	-- set $keys=JSON_KEYS($data);  -- 自动获取列    
    set $keys='["sensorname","items","unit","upperlimit","lowerlimit"]';
   	WHILE $i < JSON_LENGTH($keys) DO
		SET $field = JSON_UNQUOTE(JSON_EXTRACT($keys, CONCAT('$[', $i, ']')));    -- 在这里执行你希望对每个元素值进行的操作, 例如，输出元素值到结果集
        set $value=JSON_UNQUOTE(JSON_EXTRACT($data, CONCAT('$.', $field)));
        if ($field=$keyfield) then set $keyvalue=$value; end if;  -- 记录主键值
        if ($i>0) then
			set $sql1=concat($sql1,',');
			set $sql2=concat($sql2,',');
			set $sql3=concat($sql3,',');
        end if;
		set $sql1=concat($sql1, $field);  -- 生成insert语句中的列名部分
		set $sql2=concat($sql2, '"', $value,'"');  -- 生成insert语句中的列值部分
		set $sql3=concat($sql3, $field, '="', $value, '"');  -- 生成update语句中set 之后部分
		SET $i = $i + 1;
	END WHILE;
    if ($action='edit') then
		set @sql=concat('update environment.sensors set ', $sql3, ' where ', $keyfield,'="', $keyvalue, '"');
    else
        set @sql=concat('insert into environment.sensors (', $sql1,') values(', $sql2, ')'); 
    end if;
    #select @sql;
    prepare stmt from @sql;
	EXECUTE stmt;
	deallocate prepare stmt;
    select count(*)+1 as _rowno from environment.sensors where sensorno<$keyvalue;
end $$
delimiter ;


drop procedure if exists demo1402a;
DELIMITER $$
create procedure demo1402a( #商品分页显示
	$pageno int,
    $pagesize int,
    $keyvalue varchar(255),
    $filter varchar(255)    
)
begin
	set @sql="select a.*,b.stationname from environment.drivers a join environment.stations b using(stationno)";	    
	call sys_gridPaging(@sql, $pageno, $pagesize,'driverno',$keyvalue,'driverno;drivername;stationno;gender;stationname', $filter);
end $$
DELIMITER ;

call demo1402a(1,20,'33','');

drop procedure if exists demo1402b; 
delimiter $$
create procedure demo1402b(
	$data MediumText
)
begin
	call sys_runEditRow('environment.drivers', 'driverno', '', $data,  @row);  #row为主键列的值，json格式
    set @s=sys_GetJsonValue(@row, '_error', 'c');
    if (@s='' or @s is null) then   
		set @s=sys_GetJsonValue(@row, 'driverno', 'c');  #提取主键值，n表示数值型数据
    end if ;
    #select count(*)+1 as _rowno from products where productid<@s;
end $$
delimiter ;

drop procedure if exists demo1401b; 
delimiter $$
create procedure demo1401b(
	$data MediumText
)
begin
	call sys_runEditRow('environment.cleaners', 'cleanerno', '', $data,  @row);  #row为主键列的值，json格式
    set @s=sys_GetJsonValue(@row, '_error', 'c');
    if (@s='' or @s is null) then   
		set @s=sys_GetJsonValue(@row, 'cleanerno', 'c');  #提取主键值，n表示数值型数据
    end if ;
    #select count(*)+1 as _rowno from products where productid<@s;
end $$
delimiter ;

drop procedure if exists demo1402c; 
delimiter $$
create procedure demo1402c()
begin
	select *, stationname as stationname, concat('_',stationno) as 'key' from environment.stations;
end $$
delimiter ;

drop procedure if exists demo1403a;
DELIMITER $$
create procedure demo1403a( #商品分页显示
	$pageno int,
    $pagesize int,
    $keyvalue varchar(255),
    $filter varchar(255)    
)
begin
	set @sql="select a.*,b.stationname from environment.sprinklers a join environment.stations b using(stationno)";	    
	call sys_gridPaging(@sql, $pageno, $pagesize,'sprinklerno',$keyvalue,'sprinklertype;brand;pumptype;license;stationname', $filter);
end $$
DELIMITER ;

call demo1402a(1,20,'33','');

drop procedure if exists demo1403b; 
delimiter $$
create procedure demo1403b(
	$data MediumText
)
begin
	call sys_runEditRow('environment.sprinklers', 'sprinklerno', '', $data,  @row);  #row为主键列的值，json格式
    set @s=sys_GetJsonValue(@row, '_error', 'c');
    if (@s='' or @s is null) then   
		set @s=sys_GetJsonValue(@row, 'sprinklerno', 'n');  #提取主键值，n表示数值型数据
    end if ;
    #select count(*)+1 as _rowno from products where productid<@s;
end $$
delimiter ;

drop procedure if exists demo1403c; 
delimiter $$
create procedure demo1403c()
begin
	select *, stationname as stationname, concat('_',stationno) as 'key' from environment.stations;
end $$
delimiter ;

drop procedure if exists demo1404a;
DELIMITER $$
create procedure demo1404a( #商品分页显示
	$pageno int,
    $pagesize int,
    $keyvalue varchar(255),
    $filter varchar(255)    
)
begin
	UPDATE environment.stations
	JOIN (SELECT stationno, COUNT(*) AS cleaner_count FROM environment.cleaners GROUP BY stationno) AS cln ON stations.stationno = cln.stationno
	SET stations.employeenumber = cln.cleaner_count;

	UPDATE environment.stations
	JOIN (SELECT stationno, COUNT(*) AS driver_count FROM environment.drivers GROUP BY stationno) AS dri ON stations.stationno = dri.stationno
	SET stations.employeenumber = dri.driver_count + stations.employeenumber;

	UPDATE environment.stations
	JOIN (SELECT stationno, COUNT(*) AS sprinkler_count FROM environment.sprinklers GROUP BY stationno) AS spr ON stations.stationno = spr.stationno
	SET stations.sprnumber = sprinkler_count;
	set @sql="select * from environment.stations";	    
	call sys_gridPaging(@sql, $pageno, $pagesize,'stationno',$keyvalue,'stationno;streetno;stationname;telephone;address;employeenumber;sprnumber', $filter);
end $$
DELIMITER ;

call demo1404a(1,20,'33','');

drop procedure if exists demo1404b; 
delimiter $$
create procedure demo1404b(
	$data MediumText
)
begin
	call sys_runEditRow('environment.stations', 'stationno', '', $data,  @row);  #row为主键列的值，json格式
    set @s=sys_GetJsonValue(@row, '_error', 'c');
    if (@s='' or @s is null) then   
		set @s=sys_GetJsonValue(@row, 'stationno', 'n');  #提取主键值，n表示数值型数据
    end if ;
    #select count(*)+1 as _rowno from products where productid<@s;
end $$
delimiter ;



drop procedure if exists demo1502a;
DELIMITER $$
create procedure demo1502a( #商品分页显示
	$pageno int,
    $pagesize int,
    $keyvalue varchar(255),
    $filter varchar(255)    
)
begin
	set @sql="select a.*,b.cleanername,c.streetname,c.district,d.stationname from environment.sweeprecords a join environment.cleaners b using(cleanerno) join environment.streets c using(streetno)
    join environment.stations d on b.stationno=d.stationno";	    
	call sys_gridPaging(@sql, $pageno, $pagesize,'srecordno',$keyvalue,'srecordno;cleanername;streetname;sweepdate;sweeptime;status;stationname;district', $filter);
end $$
DELIMITER ;

drop procedure if exists demo1501a;
DELIMITER $$
create procedure demo1501a( #商品分页显示
	$pageno int,
    $pagesize int,
    $keyvalue varchar(255),
    $filter varchar(255)    
)
begin
	set @sql="select * from environment.streets";	    
	call sys_gridPaging(@sql, $pageno, $pagesize,'streetno',$keyvalue,'streetno;streetname;district', $filter);
end $$
DELIMITER ;

call demo1502a(1,20,'33','');

drop procedure if exists demo1502b; 
delimiter $$
create procedure demo1502b(
	$data MediumText
)
begin
	call sys_runEditRow('environment.sweeprecords', 'srecordno', '', $data,  @row);  #row为主键列的值，json格式
    set @s=sys_GetJsonValue(@row, '_error', 'c');
    if (@s='' or @s is null) then   
		set @s=sys_GetJsonValue(@row, 'srecordno', 'n');  #提取主键值，n表示数值型数据
    end if ;
    #select count(*)+1 as _rowno from products where productid<@s;
end $$
delimiter ;

drop procedure if exists demo1502c; 
delimiter $$
create procedure demo1502c()
begin
	select *, concat('_',cleanerno) as 'key' from environment.cleaners;
end $$
delimiter ;

drop procedure if exists demo1502d; 
delimiter $$
create procedure demo1502d()
begin
	select *, concat('_',streetno) as 'key' from environment.streets;
end $$
delimiter ;


drop procedure if exists demo1501a;
DELIMITER $$
create procedure demo1501a( #商品分页显示
	$pageno int,
    $pagesize int,
    $keyvalue varchar(255),
    $filter varchar(255)    
)
begin
	set @sql="select * from environment.streets";	    
	call sys_gridPaging(@sql, $pageno, $pagesize,'streetno',$keyvalue,'streetno;streetname;district', $filter);
end $$
DELIMITER ;

call demo1501a(1,20,'33','');

drop procedure if exists demo1501b; 
delimiter $$
create procedure demo1501b(
	$data MediumText
)
begin
	call sys_runEditRow('environment.streets', 'streetno', '', $data,  @row);  #row为主键列的值，json格式
    set @s=sys_GetJsonValue(@row, '_error', 'c');
    if (@s='' or @s is null) then   
		set @s=sys_GetJsonValue(@row, 'streetno', 'n');  #提取主键值，n表示数值型数据
    end if ;
    #select count(*)+1 as _rowno from products where productid<@s;
end $$
delimiter ;

drop procedure if exists demo1601a;
DELIMITER $$
create procedure demo1601a()
begin
	select *, waterno as id, concat(waterno,' ', watername) as 'text', waterno as 'subcategoryid', waterno as 'key' from waters 
    order by concat(trim(ancestor),id);
end $$
DELIMITER ;


drop procedure if exists demo1601c;
DELIMITER $$
create procedure demo1601c($filter varchar(255), $rowno int)
begin
	declare $s varchar(255);
    declare $start int;
    set $start=$rowno-1;
    if $start<0 then set $start=0; end if;
    set $s=concat('%', $filter, '%');
	select *,waterno as id from waters where waterno like $s or watername like $s limit $start,1;
end $$
DELIMITER ;


drop procedure if exists demo1601b;
DELIMITER $$
create procedure demo1601b(
	$data mediumtext
)
begin
    call sys_runEditRow('waters', 'waterno', '', $data, @row); 
    set @s=sys_GetJsonValue(@row, '_error', 'c');  #提取错误信息
    #select @row,@s;
    if (@s='' or @s is null) then
		set @s=sys_GetJsonValue(@row, 'waterno', 'c');  #提取主键值，n表示数值型数据
		select *, waterno as id,  waterno as 'key', concat(waterno,' ', watername) as text from waters where waterno=@s;
    end if;
end $$
DELIMITER ;


drop procedure if exists demo1602a;
DELIMITER $$
create procedure demo1602a( #商品分页显示
	$pageno int,
    $pagesize int,
    $keyvalue varchar(255),
    $filter varchar(255)    
)
begin
	set @sql="select * from environment.salvages";	    
	call sys_gridPaging(@sql, $pageno, $pagesize,'salvageno',$keyvalue,'salvageno;cleanername;salvagestime;tool', $filter);
end $$
DELIMITER ;


drop procedure if exists demo1602b; #1101c
delimiter $$
create procedure demo1602b(  ##树结构节点保存
	$data MediumText
)
begin
	call sys_runEditRow('environment.salvagerecords', 'salvageno', '', $data,  @row);  #row为主键列的值，json格式
    set @s=sys_GetJsonValue(@row, '_error', 'c');
    if (@s='' or @s is null) then   
		set @s=sys_GetJsonValue(@row, 'salvageno', 'n');  #提取主键值，n表示数值型数据
        select ancestor,waterno into @s2,@s3 from waters where waterno in (select waterno from environment.salvagerecords where salvageno=@s);
        #select @s3,@s2,@s;
        select count(*)+1 as rowno, @s2 as ancestor, @s3 waterno from environment.salvagerecords where waterno=@s3 and salvageno<@s;
    end if ;
end $$
delimiter ;

drop procedure if exists demo1602c;# 804a
DELIMITER $$
create procedure demo1602c(
	$parentnodeid varchar(100)
)
begin
	select *, waterno as id, concat(waterno,' ', watername) as 'text', waterno as 'subcategoryid', waterno as 'key' from waters 
    where parentnodeid=$parentnodeid
    order by concat(trim(ancestor),id);
end $$
DELIMITER ;


drop procedure if exists demo1602d;#804e
DELIMITER $$
create procedure demo1602d($filter varchar(255))
begin
	declare $s varchar(255);
    set $s=concat('%', $filter, '%');
	select *, waterno as id, concat(waterno,' ',watername) as 'text' from waters 
    where watername like $s or waterno like $s or englishname like $s;
 end $$
DELIMITER ;
call demo1602d('千');


drop procedure if exists demo1602e; #1101b
delimiter $$
create procedure demo1602e(
	$pageno int,
    $pagesize int,
    $keyvalue varchar(255),
    $filter varchar(255),
    $waterno varchar(100)
)
begin
	select trim(ancestor), isparentflag into @s1,@s2 from waters where waterno=$waterno;    
	if ($waterno='' or $waterno='_root') then 
    set @sql=concat("
      select a.*, b.cleanername , c.watername,
      a.salvageno as 'key' from environment.salvagerecords as a 
      join environment.cleaners b using(cleanerno)
      join environment.waters c using(waterno)
      order by a.salvageno");
   elseif (@s2=0) then
      set @sql=concat("select a.*, b.cleanername , c.watername,
      a.salvageno as 'key' from environment.salvagerecords as a 
      join environment.cleaners b using(cleanerno)
      join environment.waters c on a.waterno=c.waterno
      where a.waterno='", $waterno,"' order by a.salvageno");
   else    
      set @sql=concat("select a.*, b.cleanername , c.watername,
      a.salvageno as 'key' from environment.salvagerecords as a 
      join environment.cleaners b using(cleanerno)
      join environment.waters c on a.waterno=c.waterno
      where ancestor like '", @s1, $waterno,"#%' order by a.salvageno");
    end if;   
    #select @sql;
    call sys_gridPaging(@sql, $pageno, $pagesize,'salvageno',$keyvalue,'', $filter);
end $$
delimiter ;
#call demo1603e(1,10,'','','QTJ');

drop procedure if exists demo1602f;
DELIMITER $$
create procedure demo1602f()
begin
	select *, waterno as id, concat(waterno,' ', watername) as 'text', waterno as 'subcategoryid', waterno as 'key' from waters 
    order by concat(trim(ancestor),id);
end $$
DELIMITER ;
#call demo1603f();


drop procedure if exists demo1701a;
DELIMITER $$
create procedure demo1701a( #商品分页显示
	$pageno int,
    $pagesize int,
    $keyvalue varchar(255),
    $filter varchar(255)    
)
begin
	set @sql="select * from environment.greenspots ";	    
	call sys_gridPaging(@sql, $pageno, $pagesize,'spotno',$keyvalue,'address;spotname;greentype;square', $filter);
end $$
DELIMITER ;

call demo1701a(1,20,'33','');

drop procedure if exists demo1701b; 
delimiter $$
create procedure demo1701b(
	$data MediumText
)
begin
	call sys_runEditRow('environment.greenspots', 'spotno', '', $data,  @row);  #row为主键列的值，json格式
    set @s=sys_GetJsonValue(@row, '_error', 'c');
    if (@s='' or @s is null) then   
		set @s=sys_GetJsonValue(@row, 'spotno', 'n');  #提取主键值，n表示数值型数据
    end if ;
    #select count(*)+1 as _rowno from products where productid<@s;
end $$
delimiter ;


drop procedure if exists demo1702a;
DELIMITER $$
create procedure demo1702a( #商品分页显示
	$pageno int,
    $pagesize int,
    $keyvalue varchar(255),
    $filter varchar(255)    
)
begin
	set @sql="select a.*,b.cleanername,c.spotname from environment.greenrecords a join environment.cleaners b using(cleanerno) join environment.greenspots c using(spotno) order by mowdate desc";	    
	call sys_gridPaging(@sql, $pageno, $pagesize,'mowno',$keyvalue,'cleanername;spotname;mowtools;mowcondition', $filter);
end $$
DELIMITER ;
call demo1702a(1,20,'33','');

drop procedure if exists demo1702b; 
delimiter $$
create procedure demo1702b(
	$data MediumText
)
begin
	call sys_runEditRow('environment.greenrecords', 'mowno', '', $data,  @row);  #row为主键列的值，json格式
    set @s=sys_GetJsonValue(@row, '_error', 'c');
    if (@s='' or @s is null) then   
		set @s=sys_GetJsonValue(@row, 'mowno', 'n');  #提取主键值，n表示数值型数据
    end if ;
    #select count(*)+1 as _rowno from products where productid<@s;
end $$
delimiter ;


drop procedure if exists demo1702c; 
delimiter $$
create procedure demo1702c()
begin
	select *, concat('_',cleanerno) as 'key' from environment.cleaners;
end $$
delimiter ;

drop procedure if exists demo1702d; 
delimiter $$
create procedure demo1702d()
begin
	select *, concat('_',spotno) as 'key' from environment.greenspots;
end $$
delimiter ;

drop procedure if exists demo1801a;
DELIMITER $$
create procedure demo1801a( #商品分页显示
	$pageno int,
    $pagesize int,
    $keyvalue varchar(255),
    $filter varchar(255)    
)
begin
	set @sql="select a.*,b.streetname from environment.monitors a join environment.streets b using(streetno)";	    
	call sys_gridPaging(@sql, $pageno, $pagesize,'monitorno',$keyvalue,'streetname;monitorno', $filter);
end $$
DELIMITER ;
#call demo1801a(1,20,'33','');

drop procedure if exists demo1801b; 
delimiter $$
create procedure demo1801b(
	$data MediumText
)
begin
	call sys_runEditRow('environment.monitors', 'monitorno', '', $data,  @row);  #row为主键列的值，json格式
    set @s=sys_GetJsonValue(@row, '_error', 'c');
    if (@s='' or @s is null) then   
		set @s=sys_GetJsonValue(@row, 'monitorno', 'n');  #提取主键值，n表示数值型数据
    end if ;
    #select count(*)+1 as _rowno from products where productid<@s;
end $$
delimiter ;

drop procedure if exists demo1801c; 
delimiter $$
create procedure demo1801c()
begin
	select *, concat('_',streetno) as 'key' from environment.streets;
end $$
delimiter ;


drop procedure if exists demo1804a;
DELIMITER $$
create procedure demo1804a( #商品分页显示
	$pageno int,
    $pagesize int,
    $keyvalue varchar(255),
    $filter varchar(255)    
)
begin
	set @sql="select a.*,b.streetname from environment.monitors a join environment.streets b using(streetno)";	    
	call sys_gridPaging(@sql, $pageno, $pagesize,'monitorno',$keyvalue,'streetname;monitorno', $filter);
end $$
DELIMITER ;
#call demo1801a(1,20,'33','');

drop procedure if exists demo1804b; 
delimiter $$
create procedure demo1804b(
	$data MediumText
)
begin
	call sys_runEditRow('environment.monitors', 'monitorno', '', $data,  @row);  #row为主键列的值，json格式
    set @s=sys_GetJsonValue(@row, '_error', 'c');
    if (@s='' or @s is null) then   
		set @s=sys_GetJsonValue(@row, 'monitorno', 'n');  #提取主键值，n表示数值型数据
    end if ;
    #select count(*)+1 as _rowno from products where productid<@s;
end $$
delimiter ;

drop procedure if exists demo1804c; 
delimiter $$
create procedure demo1804c()
begin
	select *, concat('_',waterno) as 'key' from environment.waters;
end $$
delimiter ;




drop procedure if exists demo1802a;
DELIMITER $$
create procedure demo1802a( #商品分页显示
	$pageno int,
    $pagesize int,
    $keyvalue varchar(255),
    $filter varchar(255)    
)
begin
	set @sql="select a.*,b.streetname from environment.detectrecords a join environment.streets b using(streetno) order by detecttime desc ";	    
	call sys_gridPaging(@sql, $pageno, $pagesize,'wrecordno',$keyvalue,'detecttime;streetname;streetno', $filter);
end $$
DELIMITER ;
# call demo1804a(1,20,'33','');

drop procedure if exists demo1802b; 
delimiter $$
create procedure demo1802b(
	$data MediumText
)
begin
	call sys_runEditRow('environment.detectrecords', 'detectno', '', $data,  @row);  #row为主键列的值，json格式
    set @s=sys_GetJsonValue(@row, '_error', 'c');
    if (@s='' or @s is null) then   
		set @s=sys_GetJsonValue(@row, 'detectno', 'n');  #提取主键值，n表示数值型数据
    end if ;
    #select count(*)+1 as _rowno from products where productid<@s;
end $$
delimiter ;

drop procedure if exists demo1804a;
DELIMITER $$
create procedure demo1804a( #商品分页显示
	$pageno int,
    $pagesize int,
    $keyvalue varchar(255),
    $filter varchar(255)    
)
begin
	set @sql="select a.*,b.cleanername,c.drivername,d.streetname,e.license from environment.waterrecords a join environment.cleaners b using(cleanerno) join environment.drivers c using(driverno) join environment.streets d using(streetno) join environment.sprinklers e using(sprinklerno) order by wrecordno ";	    
	call sys_gridPaging(@sql, $pageno, $pagesize,'wrecordno',$keyvalue,'cleanername;drivername;streetname;way;sprinklerno', $filter);
end $$
DELIMITER ;
# call demo1804a(1,20,'33','');

drop procedure if exists demo1804b; 
delimiter $$
create procedure demo1804b(
	$data MediumText
)
begin
	call sys_runEditRow('environment.waterrecords', 'wrecordno', '', $data,  @row);  #row为主键列的值，json格式
    set @s=sys_GetJsonValue(@row, '_error', 'c');
    if (@s='' or @s is null) then   
		set @s=sys_GetJsonValue(@row, 'wrecordno', 'n');  #提取主键值，n表示数值型数据
    end if ;
    #select count(*)+1 as _rowno from products where productid<@s;
end $$
delimiter ;


drop procedure if exists demo1804c; 
delimiter $$
create procedure demo1804c()
begin
	select *, concat('_',cleanerno) as 'key' from environment.cleaners;
end $$
delimiter ;

drop procedure if exists demo1804d; 
delimiter $$
create procedure demo1804d()
begin
	select *, concat('_',driverno) as 'key' from environment.drivers;
end $$
delimiter ;

drop procedure if exists demo1804e; 
delimiter $$
create procedure demo1804e()
begin
	select *, concat('_',streetno) as 'key' from environment.streets;
end $$
delimiter ;

drop procedure if exists demo1804f; 
delimiter $$
create procedure demo1804f()
begin
	select *, concat('_',sprinklerno) as 'key' from environment.sprinklers;
end $$
delimiter ;

drop procedure if exists demo1703a; 
delimiter $$
create procedure demo1703a()
begin
	select mowcondition from environment.greenrecords;
end $$
delimiter ;


drop procedure if exists demo1503a; 
delimiter $$
create procedure demo1503a()
begin
	select *, titleno as 'value', title as 'label' from environment.titles;
end $$
delimiter ;

drop procedure if exists demo1503b; 
delimiter $$
create procedure demo1503b(
	$titleno varchar(10)
)
begin
	select *, cleanerno as 'value', cleanername as 'label' from environment.cleaners where titleno=$titleno;
end $$
delimiter ;

drop procedure if exists demo1503c; 
delimiter $$
create procedure demo1503c(
	$cleanerno char(7),
	$date1 date,
	$date2 date
)
begin
	select a.*,b.cleanername,c.streetname,c.district,d.stationname from environment.sweeprecords a 
    join environment.cleaners b using(cleanerno) 
    join environment.streets c using(streetno)
    join environment.stations d on b.stationno=d.stationno
    where cleanerno=$cleanerno and sweepdate between $date1 and $date2;
end $$
delimiter ;

drop procedure if exists demo1603a; 
delimiter $$
create procedure demo1603a()
begin
	select *, titleno as 'value', title as 'label' from environment.titles;
end $$
delimiter ;

drop procedure if exists demo1603b; 
delimiter $$
create procedure demo1603b(
	$titleno varchar(10)
)
begin
	select *, cleanerno as 'value', cleanername as 'label' from environment.cleaners where titleno=$titleno;
end $$
delimiter ;

drop procedure if exists demo1603c; 
delimiter $$
create procedure demo1603c(
	$cleanerno char(7),
	$date1 date,
	$date2 date
)
begin
	select a.*,b.watername from environment.salvagerecords a 
    join environment.waters b using(waterno)
    where cleanerno=$cleanerno and salvagestime between $date1 and $date2 order by salvagestime desc;
end $$
delimiter ;


drop procedure if exists demo1704a; 
delimiter $$
create procedure demo1704a()
begin
	select *, titleno as 'value', title as 'label' from environment.titles;
end $$
delimiter ;

drop procedure if exists demo1704b; 
delimiter $$
create procedure demo1704b(
	$titleno varchar(10)
)
begin
	select *, cleanerno as 'value', cleanername as 'label' from environment.cleaners where titleno=$titleno;
end $$
delimiter ;

drop procedure if exists demo1704c; 
delimiter $$
create procedure demo1704c(
	$cleanerno char(7),
	$date1 date,
	$date2 date
)
begin
	select a.*,b.spotname from environment.greenrecords a join environment.greenspots b  using(spotno) 
    where cleanerno=$cleanerno and mowdate between $date1 and $date2 order by mowdate desc;
end $$
delimiter ;

drop table if exists region_code;
CREATE TABLE region_code (
    code VARCHAR(2) NOT NULL,
    region VARCHAR(20) NOT NULL,
    PRIMARY KEY (code)
);

INSERT INTO region_code (code, region)
VALUES
    ('11', '北京市'),
    ('12', '天津市'),
    ('13', '河北省'),
    ('14', '山西省'),
    ('15', '内蒙古自治区'),
    ('21', '辽宁省'),
    ('22', '吉林省'),
    ('23', '黑龙江省'),
    ('31', '上海市'),
    ('32', '江苏省'),
    ('33', '浙江省'),
    ('34', '安徽省'),
    ('35', '福建省'),
    ('36', '江西省'),
    ('37', '山东省'),
    ('41', '河南省'),
    ('42', '湖北省'),
    ('43', '湖南省'),
    ('44', '广东省'),
    ('45', '广西壮族自治区'),
    ('46', '海南省'),
    ('50', '重庆市'),
    ('51', '四川省'),
    ('52', '贵州省'),
    ('53', '云南省'),
    ('54', '西藏自治区'),
    ('61', '陕西省'),
    ('62', '甘肃省'),
    ('63', '青海省'),
    ('64', '宁夏回族自治区'),
    ('65', '新疆维吾尔自治区');
drop table if exists number;
create table number(
id int primary key auto_increment,
number int
);
call insert_user(1000);



drop table if exists streets;
create table streets(
	streetno int primary key auto_increment comment '街道编号',
    streetname varchar(10)  comment '街道名称',
    district varchar(3) comment '所属区县'
     );
INSERT INTO streets (streetname, district) VALUES('清波街道', '上城区'),('湖滨街道', '上城区'),('小营街道', '上城区'),('南星街道', '上城区'),('紫阳街道', '上城区'),('望江街道', '上城区'),('凯旋街道', '上城区'),('采荷街道', '上城区'),('闸弄口街道', '上城区'),('四季青街道', '上城区'),('彭埠街道', '上城区'),('笕桥街道', '上城区'),('丁兰街道', '上城区'),('九堡街道', '上城区'),('长庆街道', '拱墅区'),('武林街道', '拱墅区'),('天水街道', '拱墅区'),('潮鸣街道', '拱墅区'),('朝晖街道', '拱墅区'),('文晖街道', '拱墅区'),('东新街道', '拱墅区'),('石桥街道', '拱墅区'),('米市巷街道', '拱墅区'),('湖墅街道', '拱墅区'),('小河街道', '拱墅区'),('和睦街道', '拱墅区'),('拱宸桥街道', '拱墅区'),('大关街道', '拱墅区'),('上塘街道', '拱墅区'),('祥符街道', '拱墅区'),('康桥街道', '拱墅区'),('半山街道', '拱墅区'),('北山街道', '西湖区'),('西溪街道', '西湖区'),('翠苑街道', '西湖区'),('古荡街道', '西湖区'),('西湖街道', '西湖区'),('留下街道', '西湖区'),('转塘街道', '西湖区'),('蒋村街道', '西湖区'),('灵隐街道', '西湖区'),('文新街道', '西湖区'),('三墩镇', '西湖区'),('双浦镇', '西湖区'),('西兴街道', '滨江区'),('长河街道', '滨江区'),('浦沿街道', '滨江区'),('城厢街道', '萧山区'),('北干街道', '萧山区'),('蜀山街道', '萧山区'),('新塘街道', '萧山区'),('靖江街道', '萧山区'),('南阳街道', '萧山区'),('闻堰街道', '萧山区'),('宁围街道', '萧山区'),('新街街道', '萧山区'),('盈丰街道', '萧山区'),('楼塔镇', '萧山区'),('河上镇', '萧山区'),('戴村镇', '萧山区'),('浦阳镇', '萧山区'),('进化镇', '萧山区'),('临浦镇', '萧山区'),('义桥镇', '萧山区'),('所前镇', '萧山区'),('衙前镇', '萧山区'),('瓜沥镇', '萧山区'),('益农镇', '萧山区'),('党湾镇', '萧山区'),('经济开发区', '萧山区'),('五常街道', '余杭区'),('仁和街道', '余杭区'),('良渚街道', '余杭区'),('闲林街道', '余杭区'),('仓前街道', '余杭区'),('余杭街道', '余杭区'),('中泰街道', '余杭区'),('径山镇', '余杭区'),('瓶窑镇', '余杭区'),('鸬鸟镇', '余杭区'),('百丈镇', '余杭区'),('黄湖镇', '余杭区'),('超山风景名胜区', '余杭区'),('临平街道', '临平区'),('南苑街道', '临平区'),('东湖街道', '临平区'),('星桥街道', '临平区'),('乔司街道', '临平区'),('运河街道', '临平区'),('崇贤街道', '临平区'),('塘栖镇', '临平区'),('白杨街道', '钱塘区'),('下沙街道', '钱塘区'),('义蓬街道', '钱塘区'),('河庄街道', '钱塘区'),('新湾街道', '钱塘区'),('临江街道', '钱塘区'),('前进街道', '钱塘区'),('玲珑街道', '临安区'),('锦南街道', '临安区'),('锦城街道', '临安区'),('锦北街道', '临安区'),('青山湖街道', '临安区'),('高虹镇', '临安区'),('太湖源镇', '临安区'),('於潜镇', '临安区'),('太阳镇', '临安区'),('潜川镇', '临安区'),('昌化镇', '临安区'),('河桥镇', '临安区'),('湍口镇', '临安区'),('清凉峰镇', '临安区'),('岛石镇', '临安区'),('板桥镇', '临安区'),('天目山镇', '临安区'),('龙岗镇', '临安区'),('富春街道', '富阳区'),('春江街道', '富阳区'),('鹿山街道', '富阳区'),('东洲街道', '富阳区'),('银湖街道', '富阳区'),('万市镇', '富阳区'),('洞桥镇', '富阳区'),('渌渚镇', '富阳区'),('永昌镇', '富阳区'),('里山镇', '富阳区'),('常绿镇', '富阳区'),('场口镇', '富阳区'),('常安镇', '富阳区'),('龙门镇', '富阳区'),('新登镇', '富阳区'),('胥口镇', '富阳区'),('大源镇', '富阳区'),('灵桥镇', '富阳区'),('新桐乡', '富阳区'),('上官乡', '富阳区'),('环山乡', '富阳区'),('湖源乡', '富阳区'),('春建乡', '富阳区'),('渔山乡', '富阳区');
ALTER TABLE STREETS MODIFY COLUMN STREETNO VARCHAR(11);
update streets set streetno=concat(sys_getFirstPyCode(SUBSTRING(DISTRICT,1,2)),sys_getFirstPyCode(STREETNAME),FLOOR(10+RAND()*90));
select * from streets;

drop table if exists address;
create table address(
district char(3),
community varchar(50)
);
INSERT INTO address (district, community) VALUES
('余杭区', '锦绣钱塘'),('余杭区', '爵士风情听风苑'),('余杭区', '水岸花苑'),('余杭区', '山西园小区'),('余杭区', '白鹭郡北'),('余杭区', '绿城桃花源'),('萧山区', '明华佳乐苑'),('萧山区', '云都凤凰城'),('萧山区', '临平桂花城'),('萧山区', '三水一生'),('萧山区', '毓秀家园'),('萧山区', '赞成首府'),('西湖区', '东安景苑'),('西湖区', '桐庐碧桂园(公寓住宅)'),('西湖区', '佳源未来府'),('西湖区', '东海水漾人家'),('西湖区', '逸城(别墅)'),('西湖区', '三江鸣翠蓝湾(别墅)'),('滨江区', '赞成檀府(公寓住宅)'),('滨江区', '临平桂花城(北区)'),('滨江区', '梅堰小区'),('滨江区', '良渚花苑(公寓住宅)'),('滨江区', '冠山小区'),('滨江区', '三江花园(公寓住宅)'),('拱墅区', '和平雅苑'),('拱墅区', '中南白马湖壹号(公寓住宅)'),('拱墅区', '三江鸣翠蓝湾(别墅)'),('拱墅区', '南北乐章'),('拱墅区', '东海闲湖城(公寓住宅)'),('拱墅区', '新时代城市家园'),('上城区', '山西园小区'),('上城区', '三江鸣翠蓝湾(别墅)'),('上城区', '毓秀家园'),('上城区', '桐庐碧桂园(公寓住宅)'),('上城区', '临东家园'),('上城区', '顺发康庄(公寓住宅)'),('富阳区', '三江鸣翠蓝湾(别墅)'),('富阳区', '滨江花园'),('富阳区', '华盛星洲翠谷'),('富阳区', '绿城富春玫瑰园(别墅)'),('富阳区', '春江美庐(公寓住宅)'),('富阳区', '湖畔秋水览山'),('临安区', '佳源未来府'),('临安区', '桐庐碧桂园(公寓住宅)'),('临安区', '九龙仓雍景山(公寓住宅)'),('临安区', '林之语(公寓住宅)'),('临安区', '东晖龙悦湾(公寓住宅)'),('临平区', '赞成檀府(公寓住宅)'),('临平区', '金域三江'),('临平区', '金石华城'),('临平区', '江南摩卡小区'),('临平区', '通和南岸花城(公寓住宅)'),('临平区', '绿城桃花源(南区)'),('钱塘区', '宋都东郡国际嘉湾'),('钱塘区', '山西园小区'),('钱塘区', '东海闲湖城(公寓住宅)'),('钱塘区', '白鹭郡北'),('钱塘区', '逸城(公寓住宅)'),('钱塘区', '通和戈雅公寓');

drop table if exists cleaners;
create table cleaners(
	cleanerno int auto_increment primary key comment  '员工编号',
    cleanername varchar(10)  comment '员工姓名',
    stationno int comment'所属环卫站',
    idcard char(18) comment '身份证号码',
    gender enum('男','女') comment '性别',
    mobile char(20) comment '电话号码',
    birthdate date comment '出生日期',
    hiredate date comment '雇佣日期',
    pays int comment '工资',
    address text comment'地址',
    email varchar(50) comment 'email',
    titleno varchar(10),
    `Photopath` json DEFAULT NULL
     );

INSERT INTO cleaners (cleanername, stationno,idcard, gender, mobile, birthdate, hiredate, pays,address,email,titleno,photopath)
SELECT
    rand_name() AS cleanername,
    FLOOR( 1 + (RAND() * 145)) AS stationno,
    CONCAT(
    (SELECT code FROM region_code ORDER BY RAND() LIMIT 1),floor(rand()*10),floor(rand()*10),floor(rand()*10),floor(rand()*10),
    DATE_FORMAT(DATE_ADD(NOW(), INTERVAL -RAND()*365*100 DAY), '%Y%m%d'),
    LPAD(FLOOR(RAND() * 1000), 4, '0')
) ,
    CASE FLOOR(1 + (RAND() * 2))
        WHEN 1 THEN '男' WHEN 2 THEN '女'
    END AS gender,
    mobile_rand() AS mobile,
    DATE_ADD(STR_TO_DATE('1970-01-01', '%Y-%m-%d'), INTERVAL FLOOR(1 + (RAND() * 10957)) DAY) AS birthdate,
    DATE_ADD(STR_TO_DATE('2005-01-01', '%Y-%m-%d'), INTERVAL FLOOR(1 + (RAND() * 3650)) DAY) AS hiredate,
    pays_rand() as pays,
    address_rand() as address,
    CONCAT(upper(SUBSTRING(MD5(RAND()), 1, 7)),'@','163.com') AS email,
     CASE FLOOR(1 + (RAND() * 2))
        WHEN 1 THEN 1 WHEN 2 THEN 2
    END AS title,
    '[{"filename": "mybase/products/1.jpg"}]'
    
FROM number LIMIT 500;
ALTER TABLE CLEANERS MODIFY COLUMN cleanerno CHAR(7); 
set sql_safe_updates=0;
update cleaners set cleanerno=
case char_length(cleanername)
when 2 then concat(sys_getFirstPyCode(cleanername),'-',FLOOR(100+RAND()*899),if(gender='男','M','F'))
when 3 then concat(sys_getFirstPyCode(cleanername),FLOOR(10+RAND()*899),if(gender='女','F','M'))
end;


select * from cleaners; 


drop table if exists drivers;
create table drivers(
	driverno int primary key auto_increment comment '司机编号',
    drivername varchar(10)  comment '司机姓名',
    stationno int comment '所属环卫站',    
    gender enum('男','女') comment '性别',
    mobile char(11) comment '电话号码',
    birthdate date comment '出生日期',
    hiredate date comment '雇佣日期',
    pays int comment '工资',
    address text comment '地址',
    email varchar(50) comment 'email',
	`Photopath` json DEFAULT NULL
     );

INSERT INTO drivers (drivername, stationno, gender, mobile, birthdate, hiredate, pays,address,email,photopath)
SELECT
    rand_name() AS drivername,
    FLOOR(1 + (RAND() * 10)) AS stationno,
    CASE FLOOR(1 + (RAND() * 2))
        WHEN 1 THEN '男' WHEN 2 THEN '女'
    END AS gender,
    mobile_rand() AS mobile,
    DATE_ADD(STR_TO_DATE('1970-01-01', '%Y-%m-%d'), INTERVAL FLOOR(1 + (RAND() * 10957)) DAY) AS birthdate,
    DATE_ADD(STR_TO_DATE('2005-01-01', '%Y-%m-%d'), INTERVAL FLOOR(1 + (RAND() * 3650)) DAY) AS hiredate,
    pays_rand() as pays,
    address_rand() as address,
    CONCAT(upper(SUBSTRING(MD5(RAND()), 1, 7)),'@',FLOOR(1 + (RAND() * 10)),'.com') AS email,  #随机生成七位字母数字组合
	'[{"filename": "mybase/products/1.jpg"}]'

FROM address LIMIT 2000;
ALTER TABLE drivers MODIFY COLUMN driverno VARCHAR(10); 
set sql_safe_updates=0;
update drivers set driverno=
case char_length(drivername)
when 2 then concat(sys_getFirstPyCode(drivername),'-',FLOOR(100+RAND()*899),if(gender='男','M','F'))
when 3 then concat(sys_getFirstPyCode(drivername),FLOOR(100+RAND()*899),if(gender='女','F','M'))
end;             

drop table if exists stations;
create table stations(
	stationno int primary key auto_increment comment '环卫站编号',
    streetno varchar(15) comment '所属街道',
    stationname varchar(20)comment '环卫站名称',
    telephone char(11) comment '联系电话',
    address text comment '地址',
    employeenumber int comment '职工人数' default 0,
    sprnumber int comment '汽车数量' default 0
     );
INSERT INTO stations (streetno, stationname, telephone, address,employeenumber)
SELECT  
    streetno,
    CONCAT(streetname, '环卫站') AS stationname,  -- 构造环卫站名称
    mobile_rand() AS telephone,  -- 随机生成联系电话
    concat(streetname,floor(1 + (rand()*60)),'号'),
    FLOOR(10 + (RAND() * 30)) AS employeenumber  -- 随机生成职工人数，范围10-39
FROM streets ORDER BY streetno;  -- 按照街道编号顺序插入


drop table if exists brands;
create table brands(
brandno int primary key auto_increment,
brandname varchar(20),
website varchar(100)
);
INSERT INTO brands (brandname, website) VALUES
('东风环保', 'https://www.maigoo.com/brand/3844653.html'),('盈峰环境', 'http://www.inforeenviro.com/'),('徐工环境', 'https://www.xcmg.com/solution/sanitation.htm'),('福龙马FULONGMA', 'https://fjlm.com.cn/products/index.htm'),('宇通环卫', 'https://www.yutong.com.cn/solutions/hwsb/'),('程力威CLW', 'http://www.clwch.com/'),('楚胜', 'http://www.szcsc.cn/html/about/'),('福田汽车FOTON', 'http://www.aerosun.cn/'),('航天晨光', 'http://www.aerosun.cn/n3379707/index.html');
select * from brands;

drop table if exists sprinklers;
create table sprinklers(
	sprinklerno int primary key auto_increment comment '洒水车编号',
    stationno int comment '所属环卫站',
    sprinklertype set('绿化洒水车','喷雾洒水车')  comment '洒水车类型',
    brand set('东风环保','盈峰环境','徐工环境','福龙马FULONGMA','宇通环卫','程力威CLW','楚胜','福田汽车FOTON','航天晨光') comment '洒水车品牌',    
    website varchar(50) comment '品牌网址',
    pumptype char(11) comment '水泵种类',
    waterstorage int comment '储水量(吨)',
    license char(7) comment '车牌',
    producedate date comment '生产日期',
	serviceyear INT COMMENT '使用年限'
     );
    
drop trigger if exists before_insert_sprinklers   ;
DELIMITER $$
CREATE TRIGGER before_insert_sprinklers
BEFORE INSERT ON sprinklers
FOR EACH ROW
BEGIN
    SET NEW.serviceyear = TIMESTAMPDIFF(YEAR, NEW.producedate, CURDATE());
END$$
DELIMITER ;

drop trigger if exists before_update_sprinklers   ;
DELIMITER $$
CREATE TRIGGER before_update_sprinklers
before update ON sprinklers
FOR EACH ROW
BEGIN
    SET NEW.serviceyear = TIMESTAMPDIFF(YEAR, NEW.producedate, CURDATE());
END$$
DELIMITER ;


INSERT INTO sprinklers (stationno, sprinklertype, brand, waterstorage, license, producedate, serviceyear)
SELECT 
FLOOR( 1 + (RAND() * 145)) AS stationno,
CASE WHEN RAND() > 0.5 THEN '绿化洒水车' ELSE '喷雾洒水车' END,
company_rand(),
FLOOR(3 + (RAND() * 8)), -- 随机生成储水量
concat('浙A',upper(SUBSTRING(MD5(RAND()), 1, 5))), -- 随机生成车牌
DATE_SUB(NOW(), INTERVAL FLOOR(1 + (RAND() * 10)) YEAR), -- 随机生成生产日期
TIMESTAMPDIFF(YEAR, DATE_SUB(NOW(), INTERVAL FLOOR(1 + (RAND() * 10)) YEAR), CURDATE()) AS serviceyear
FROM number ORDER BY RAND() LIMIT 200; -- 限制生成100条数据



UPDATE sprinklers
JOIN brands ON sprinklers.brand = brands.brandname
SET sprinklers.website= brands.website,
	pumptype =  CASE 
    WHEN waterstorage < 8 THEN '65QZ40/50'
    ELSE '80QZ60/90' 
  END;

UPDATE stations
JOIN (SELECT stationno, COUNT(*) AS cleaner_count FROM cleaners GROUP BY stationno) AS cln ON stations.stationno = cln.stationno
SET stations.employeenumber = cln.cleaner_count;

UPDATE stations
JOIN (SELECT stationno, COUNT(*) AS driver_count FROM drivers GROUP BY stationno) AS dri ON stations.stationno = dri.stationno
SET stations.employeenumber = dri.driver_count + stations.employeenumber;

UPDATE stations
JOIN (SELECT stationno, COUNT(*) AS sprinkler_count FROM sprinklers GROUP BY stationno) AS spr ON stations.stationno = spr.stationno
SET stations.sprnumber = sprinkler_count;


drop table if exists waterrecords;
create table waterrecords(
	wrecordno int primary key auto_increment comment '洒水记录编号',
    sprinklerno int comment '洒水车编号',
    cleanerno char(7) comment '环卫工人编号',
    driverno char(7) comment '司机编号',
    streetno varchar(20) comment '街道编号',
    way varchar(4) comment '洒水方式',
    amount int comment '洒水量',
    waterdate varchar(20) comment'洒水日期'

    );
    
    INSERT INTO waterrecords (
    sprinklerno, cleanerno, driverno, streetno, way, amount, waterdate
) SELECT
    spr.sprinklerno,
    cln.cleanerno,
    dri.driverno,
    st.streetno,
    CASE WHEN RAND() > 0.5 THEN '高压清扫' ELSE '雾化降雨' END AS way, -- 随机选择洒水方式
    FLOOR(1 + (RAND() * 3)) AS amount, -- 随机生成洒水量
	concat((DATE_FORMAT(NOW() - INTERVAL FLOOR(1 + (RAND() * 3650)) DAY, '%Y-%m-%d')),' ',(
       MAKETIME(FLOOR(1 + (RAND() * 23)), FLOOR(1 + (RAND() * 59)), FLOOR(1 + (RAND() * 59))))) AS random_time -- 随机生成洒水日期
FROM number
join sprinklers spr 
JOIN stations st ON spr.stationno = st.stationno
JOIN cleaners cln ON st.stationno = cln.stationno
JOIN drivers dri ON st.stationno = dri.stationno
ORDER BY RAND()
LIMIT 5000; -- 限制生成5000条数据
    
drop table if exists sweeprecords;    
create table sweeprecords(
	srecordno int primary key auto_increment comment '清扫记录编号',
    cleanerno char(7) comment '环卫工人编号',
    streetno varchar(15) comment '街道编号',
    sweepdate date comment'清扫日期' ,
	sweeptime time comment'清扫时间' ,
	status varchar(15) comment'完成状态' ,
    mannager varchar(10) comment'负责人姓名'
	
    );

INSERT INTO sweeprecords (cleanerno,streetno,sweepdate,sweeptime ,status) 
with tmp as(
SELECT cln.cleanerno,st1.streetno,
    DATE_SUB(NOW(), INTERVAL FLOOR(1 + (RAND() * 730)) DAY) AS sweepdate,
    concat(FLOOR(5 + (RAND() * 10)),':',FLOOR(RAND() * 6),FLOOR(RAND() * 10),':',FLOOR(RAND() * 6),FLOOR(RAND() * 10)) AS sweeptime,
     CASE
            WHEN RAND() < 0.1 THEN '不合格'  -- 10% 的概率为不合格
            WHEN RAND() < 0.75 THEN '合格'    -- 80% 的概率为合格
            ELSE '优秀'                     -- 剩余 10% 的概率为优秀
        END AS status
FROM number
join streets st1
JOIN stations st ON st1.streetno = st.streetno
JOIN cleaners cln ON st.stationno = cln.stationno
ORDER BY RAND()
LIMIT 20000)
select * from tmp order by sweepdate  desc;


drop table if exists waters;    
create table waters(
	waterno char(14) primary key, 
    watername varchar(50),
    englishname varchar(50),
    parentnodeid char(14),
    isparentflag tinyint(4),
    level tinyint(4),
    ancestor varchar(150),
    unit varchar(4) comment '计量单位（水域面积 m2，河道长度 km）',
    scale float comment '规模', 
    description text comment'描述'
);

INSERT INTO waters (waterno, watername, englishname, parentnodeid, isparentflag, level, ancestor, unit, scale, description)
VALUES
-- 钱塘江水系
('QTJ', '钱塘江水系', 'Qiantang River System', NULL, 1, 1, '', 'km', NULL, '钱塘江水系是杭州的主要水系'),
('QTJ-XAJ', '新安江', 'Xin''an River', 'QTJ', 1, 2, 'QTJ#', 'km', 150, '新安江是钱塘江上游的一部分，流经建德、淳安等地'),
('QTJ-XAJ-QDH', '千岛湖', 'Thousand Islands Lake', 'QTJ-XAJ', 0, 3, 'QTJ#XAJ#', 'm²', 580000, '千岛湖是新安江上的人工湖，也是著名的旅游景点'),
('QTJ-TJ', '桐江', 'Tong River', 'QTJ', 0, 2, 'QTJ#', 'km', 50, '桐江是钱塘江干流的一部分，流经桐庐县'),
('QTJ-FCJ', '富春江', 'Fuchun River', 'QTJ', 0, 2, 'QTJ#', 'km', 110, '富春江是钱塘江的一段，以风景秀丽著称'),
('QTJ-JXSBJ', '九溪十八涧', 'Nine Creeks and Eighteen Streams', 'QTJ', 0, 2, 'QTJ#', 'km', 5, '九溪十八涧是西湖边的钱塘江支流，以曲折流水著称'),

-- 太湖水系
('TH', '太湖水系', 'Taihu Lake System', NULL, 1, 1, '', 'm²', NULL, '太湖水系对杭州的水系有重要影响'),
('TH-XH', '西湖', 'West Lake', 'TH', 0, 2, 'TH#', 'm²', 6000000, '西湖是杭州市的标志性湖泊，也是著名的旅游景点'),
('TH-DXC', '东苕溪', 'East Tiaoxi River', 'TH', 0, 2, 'TH#', 'km', 96, '东苕溪是太湖水系的重要支流，流经杭州市西北部'),

-- 京杭大运河
('JHDYH', '京杭大运河', 'Beijing-Hangzhou Grand Canal', NULL, 1, 1, '', 'km', NULL, '京杭大运河是中国的一条重要运河'),
('JHDYH-GXH', '古新河', 'Guxin River', 'JHDYH', 0, 2, 'JHDYH#', 'km', 3800, '古新河是京杭大运河的支流，连接西湖和大运河'),

-- 其他支流
('QTZL', '其他支流', 'Other Tributaries', NULL, 1, 1, '', '1', NULL, '包括杭州其他重要的水系支流'),
('QTZL-ZDYH', '浙东运河', 'Eastern Zhejiang Canal', 'QTZL', 0, 2, 'QTZL#', 'km', 20, '浙东运河连接钱塘江和曹娥江，是人工运河'),
('QTZL-XKH', '新开河', 'Xinkai River', 'QTZL', 0, 2, 'QTZL#', 'km', 11, '新开河是杭州城中的一条小河，与贴沙河平行'),
('QTZL-ZH', '中河', 'Zhong River', 'QTZL', 0, 2, 'QTZL#', 'km', 6400, '中河是杭州城区中部的一条重要河道'),
('QTZL-DH', '东河', 'Dong River', 'QTZL', 0, 2, 'QTZL#', 'km', 4000, '东河是杭州老城东部的一条河道'),
('QTZL-THS', '贴沙河', 'Tiesha River', 'QTZL', 0, 2, 'QTZL#', 'km', 6100, '贴沙河是杭州的一条重要支流，曾是城市的边界'),
('QTZL-STH', '上塘河', 'Shangtang River', 'QTZL', 0, 2, 'QTZL#', 'km', 28, '上塘河是杭州的一条古老河道，有悠久的历史'),
('QTZL-XX', '西溪', 'Xixi', 'QTZL', 0, 2, 'QTZL#', 'km', 35, '西溪是杭州的一条小溪，发源于余杭，流经西溪湿地'),
('QTZL-YHTH', '余杭塘河', 'Yuhangtang River', 'QTZL', 0, 2, 'QTZL#', 'km', 24, '余杭塘河是杭州城内除大运河外能通航的河道之一'),
('QTZL-ZJG', '紫金港', 'Zijingang', 'QTZL', 0, 2, 'QTZL#', 'km', 5, '紫金港是杭州的一条河流，连接西溪和余杭塘河'),
('QTZL-XH', '小河', 'Xiao River', 'QTZL', 0, 2, 'QTZL#', 'km', 7, '小河是杭州的一条小型河道，流经小河社区');

drop table if exists greenspots;
create table greenspots(
	spotno int primary key auto_increment comment '绿化点编号',
    streetno VARCHAR(15) comment '街道编号',
    spotname varchar(10)  comment '绿化点名称',
	greentype varchar(50) comment '绿化点类型',
    address varchar(50) ,
    square CHAR(6) comment '占地面积'
     );
INSERT INTO greenspots (streetno, spotname,square,greentype,address)
SELECT
    streetno,
    CONCAT(streetname, '绿化点') AS spotname,
    CONCAT(FLOOR(1000 + RAND() * 5000),'m2' )AS square,
    CASE FLOOR(1 + (RAND() * 3))
        WHEN 1 THEN '公园'
        WHEN 2 THEN '街道'
        ELSE '社区'
    END AS greentype,
    concat(streetname,floor(1+rand()*100),'号') as address
FROM streets order  by rand() limit 80;


drop table if exists greenrecords;
create table greenrecords (
    mowno int primary key auto_increment comment '绿化记录编号',
    spotno int ,
    cleanerno char(7) comment '环卫工人编号',
    mowdate date comment '除草日期',
    mowtime char(5) comment'除草时间',
    mowlong varchar(10) comment '除草时长',
    mowtools varchar(50) comment '除草工具',
    mowcondition varchar(50) comment '除草后状况'
);
INSERT INTO greenrecords (spotno, cleanerno, mowdate, mowtime, mowlong, mowtools, mowcondition)
SELECT
    g.spotno,
    c.cleanerno,
    DATE_SUB(NOW(), INTERVAL FLOOR(1 + (RAND() * 3650)) DAY) AS mowdate, -- 除草日期
    CONCAT(FLOOR(15 + (RAND() * 9)), ':', FLOOR(RAND() * 6), '0') AS mowtime, -- 除草时间，确保格式正确
    concat(FLOOR(30 + (RAND() * 90)),'分钟') AS mowlong, -- 假设除草时长在30到120分钟之间
    CASE FLOOR(1 + (RAND() * 3))
        WHEN 1 THEN '手动剪刀'
        WHEN 2 THEN '自动割草机'
        ELSE '电动割草机'
    END AS mowtools,
    CASE FLOOR(1 + (RAND() * 6))
        WHEN 1 THEN '较差'
        WHEN 2 THEN '一般'
        ELSE '良好'
    END AS mowcondition
FROM cleaners c
JOIN greenspots g ;

drop table if exists salvagerecords;     
create table salvagerecords (
	salvageno int primary key auto_increment comment '打捞记录编号',
    cleanerno char(7) comment '环卫工人编号',
    waterno varchar(25) comment'河段编号',
    salvagestime datetime comment '打捞时间',
	
	tool varchar(15) comment'打捞工具' ,
    sstate varchar(3) comment'打捞状态',
	`Photopath` json DEFAULT NULL

);
INSERT INTO salvagerecords (salvageno, cleanerno, waterno, salvagestime,tool,sstate)
SELECT
    s.id,
    cln.cleanerno,
    w.waterno AS waterno,
    concat(DATE_SUB(NOW(), INTERVAL FLOOR(1 + (RAND() * 3650)) DAY) 
    ) AS salvagestime, -- 随机生成开始时间
    CASE    WHEN RAND() < 0.25 THEN '长柄网'  
			WHEN RAND() < 0.5 THEN '打捞钩'    --
            WHEN RAND() < 0.75 THEN '拖网'    -- 
            ELSE '抓斗'                     -- 
        END AS tool,
        CASE    WHEN RAND() < 0.8 THEN '完成'  
            ELSE '需加派'                     -- 
        END AS sstate
FROM
    (SELECT NULL AS id) AS s -- 使用子查询生成序列
CROSS JOIN cleaners cln -- 与环卫工人表进行连接
JOIN waters w ON w.isparentflag = 0 -- 只连接waters表中的叶子节点
ORDER BY RAND()
LIMIT 20000; -- 限制生成的记录数

drop table if exists sensors;
create table sensors(
	sensorno int primary key auto_increment comment '传感器编号',
	sensorname char(10) comment '传感器名称',
	items varchar(10) comment '测量指标', 
    unit varchar(10) comment '单位',
    upperlimit int comment'上限',
    lowerlimit int comment'下限'
);
INSERT INTO sensors (sensorname, items, unit, upperlimit, lowerlimit)
VALUES
('温度传感器', '温度', '°C', 25, 18),
('湿度传感器', '湿度', '%', 65, 45),
('pH值传感器', 'pH', '无量纲', 6, 4),
('雨量传感器', '降水强度', 'mm/24h', 250, 0),
('气压计', '大气压强', 'hPa', 1050, 950),
('能见度测量仪', '能见度', 'm', null, 0),
('紫外线指数测量仪', '紫外线指数', 'mW/m2', 15, 0);

drop table if exists monitors;
create table monitors(
	monitorno int primary key auto_increment comment'监测点编号',
    streetno varchar(15) comment '街道编号',
	settime date comment '安装日期'
);
insert into monitors(streetno,settime) 
select streetno,    DATE_SUB(NOW(), INTERVAL FLOOR(1 + (RAND() * 3650)) DAY) AS settime
 from streets join number order by rand() limit 200; 
 
drop table if exists detectrecords;
create table detectrecords(
	detectno int primary key auto_increment comment '检测记录编号',
    monitorno int comment '监测点编号',
    visibility int comment '能见度',
    humidity int comment '湿度',
    detectitems json comment '测量数据',
    detecttime varchar(20) comment '测量时间',
    temperature int comment '温度',

	streetno varchar(15) comment '所属街道'

);
INSERT INTO detectrecords (
    monitorno, visibility, humidity, detectitems, detecttime, temperature, streetno
) SELECT
    m.monitorno,
    FLOOR(10 + RAND() * 1990) AS visibility, -- 随机生成能见度，50%概率为NULL
    FLOOR(30 + RAND() * 50) AS humidity, -- 随机生成湿度
    JSON_OBJECT(
        'pH值',  FLOOR(3 + RAND() * 4), -- pH值
        '降水强度', CASE WHEN RAND() > 0.5 THEN FLOOR(0 + RAND() * 250) ELSE NULL END, -- 降水强度，66.67%概率为NULL
        '大气压强',  FLOOR(999.2 + RAND() * 22), -- 大气压强
        '紫外线指数', FLOOR(0 + RAND() * 15) -- 紫外线指数
    ) AS detectitems, -- 注意这里将字段名更改为detectitems
    CONCAT(
        DATE_FORMAT(DATE_SUB(NOW(), INTERVAL FLOOR(1 + (RAND() * 3650)) DAY), '%Y-%m-%d'),
        ' ',
        LPAD(FLOOR(0 + RAND() * 24), 2, '0'), ':', -- 生成00到23之间的小时
        LPAD(FLOOR(RAND() * 60), 2, '0'), ':', -- 生成00到59之间的分钟
        LPAD(FLOOR(RAND() * 60), 2, '0') -- 生成00到59之间的秒
    ) AS detecttime, -- 修正后的日期时间格式
    FLOOR(11 + RAND() * 21) AS temperature, -- 随机生成温度
    s.streetno
FROM monitors m
JOIN streets s
ORDER BY RAND()
LIMIT 20000;

  
drop table if exists titles;  
create table titles (
titleno int primary key auto_increment,
title char(4)
);
insert into titles(title) values('司机'),('环卫工人'),('负责人');

