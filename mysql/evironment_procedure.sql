   
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
IF
name_no=1
THEN
#名
SELECT SUBSTRING(rand_name,name_num,1) INTO `name`;
ELSE
#名
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

select company_rand();

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

call insert_user(1000);
select * from number;



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
	set @sql="select a.*,b.stationname from environment.cleaners a join environment.stations b using(stationno)";	    
	call sys_gridPaging(@sql, $pageno, $pagesize,'cleanerno',$keyvalue,'cleanerno;cleanername;stationno;gender;stationname', $filter);
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


drop procedure if exists demo1408a; 
delimiter $$
create procedure demo1408a(
	$pageno int,
    $pagesize int,
    $filter varchar(255)
)
begin
	set @sql="select * from environment.sensors";
    call sys_gridPaging(@sql, $pageno, $pagesize, '','','sensorname;items;unit;upperlimit;lowerlimit', $filter);
end $$
delimiter ;

/*
drop procedure if exists demo307a; 
delimiter $$
create procedure demo307a(
	$pageno int,
    $pagesize int,
    $filter varchar(255)
)
begin
	set @sql="select a.*, b.areaname as region, c.areaname as city, d.description as customertype from customers a 
    join areas b on a.regionid=b.areaid
    join areas c on a.cityid=c.areaid
    join customertypes d on d.typeid=a.typeid order by a.customerid";
    call sys_gridPaging(@sql, $pageno, $pagesize, '','','customerid;companyname;contactname;contacttitle;address;email;zip;phone;homepage;region;city', $filter);
end $$
delimiter ;
#call demo307a(2,10,'');
*/

drop procedure if exists demo1408b; 
delimiter $$
create procedure demo1408b(
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
	call sys_gridPaging(@sql, $pageno, $pagesize,'driverno',$keyvalue,'cdriverno;cleanername;stationno;gender;stationname', $filter);
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
		set @s=sys_GetJsonValue(@row, 'driverno', 'n');  #提取主键值，n表示数值型数据
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