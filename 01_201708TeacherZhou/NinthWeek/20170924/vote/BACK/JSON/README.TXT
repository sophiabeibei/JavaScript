USER表字段及说明：
    ID：用户的编号，唯一&自增长
    NAME：用户名
    PICTURE：用户的头像，默认会根据性别分配头像
    PHONE：手机号
    SEX：性别 0->男 1->女
    PASSWORD：密码(经过MD5加密后的结果 & 自己进行了二次加密处理)
    BIO：个人说明
    TIME：注册时间
    ISMATCH：是否参赛  0->未参赛(默认)  1->已经参赛
    MATCHID：参赛编号(默认值000)
    SLOGAN：参赛标语
    VOTENUM：获得的总票数，默认值为0

VOTE表字段及说明
    ID：投票信息ID，唯一&自增长
    voterId：投票人ID
    participantId:被投人ID
    TIME：投票的时间