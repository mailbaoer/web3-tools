const allTools = [
    {
        title: "Web3",
        children: [
            {
                name: 'PrivateKeyReverse',
                title: 'PrivateKey 反查',
                description: '使用PrivateKey 反查 Public Key',
                icon: 'noto:locked-with-key',
            },
            {
                name: 'CreateAccount',
                title: '创建新账户',
                description: '创建新账户，返回address，privatekey，助记词',
                icon: 'noto:locked-with-key',
            },
            {
                name: 'SignMessage',
                title: '消息签名',
                description: '根据录入的消息生成签名',
                icon: 'noto:locked-with-key',
            },
            {
                name: 'HexNumberConvert',
                title: '16 进制 & 10 进制互转',
                description: '16 进制数据和10进制数据互转',
                icon: 'noto:locked-with-key',
            },
        ]
    },
    {
        title: "日常工具",
        children: [
            {
                name: 'URLCode',
                title: 'URL 转码',
                description: '将URL进行解码、转码',
                icon: 'noto:locked-with-key',
            },
            {
                name: 'Base64Code',
                title: 'Base64 转码',
                description: 'Base64的转换',
                icon: 'noto:locked-with-key',
            },
            {
                name: 'UnixTimestamp',
                title: 'Unix 时间戳',
                description: 'Unix 时间戳的转换',
                icon: 'noto:locked-with-key',
            },
            {
                name: 'PasswordGenerate',
                title: '随机密码',
                description: '随机密码的生成',
                icon: 'noto:locked-with-key',
            },
            {
                name: 'GeoIP',
                title: 'GeoIP 查询',
                description: '本机IP查询',
                icon: 'noto:locked-with-key'
            },
            {
                name: 'JsonFormat',
                title: 'JSON 格式化',
                description: 'JSON 格式化',
                icon: 'noto:locked-with-key'
            }
        ]
    },
    {
        title: "图片工具",
        children: [
            {
                name: "BackgroundRemoval",
                title: "背景移除",
                description: "移除图片背景",
                icon: 'noto:locked-with-key'
            }
        ]
    }
];

export { allTools };
