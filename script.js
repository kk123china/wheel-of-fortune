/**
 * 幸运转盘 - 核心逻辑
 * 功能：Canvas转盘绘制、旋转动画、选项管理、自定义设置
 */

// ==================== 配置数据 ====================

// 颜色方案配置
const colorSchemes = {
    default: [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
        '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F',
        '#BB8FCE', '#85C1E9', '#F1948A', '#82E0AA'
    ],
    warm: [
        '#FF6B6B', '#FF8E53', '#FFA07A', '#FFD700',
        '#FF7F50', '#FF69B4', '#FF4500', '#FF6347',
        '#FFA500', '#FFE4B5', '#FF1493', '#FFDAB9'
    ],
    cool: [
        '#4ECDC4', '#45B7D1', '#5DADE2', '#3498DB',
        '#85C1E9', '#AED6F1', '#BB8FCE', '#9B59B6',
        '#82E0AA', '#58D68D', '#48C9B0', '#76D7C4'
    ],
    macaron: [
        '#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9',
        '#BAE1FF', '#E0BBE4', '#FFC8DD', '#BDE0FE',
        '#A2D2FF', '#CDFADB', '#FFD6A5', '#FDFFB6'
    ]
};

// 预设模板数据
const templates = {
    lunch: ['麻辣烫', '黄焖鸡', '兰州拉面', '沙县小吃', '盖浇饭', '饺子'],
    task: ['写报告', '开会', '代码审查', '文档整理', '测试', '优化'],
    number: ['1', '2', '3', '4', '5', '6', '7', '8'],
    yesno: ['是', '否']
};

// ==================== 智能推荐数据库 ====================

const recommendationDatabase = {
    // 美食分类
    '美食': [
        '火锅', '烧烤', '寿司', '披萨', '汉堡', '炸鸡',
        '麻辣烫', '黄焖鸡', '兰州拉面', '沙县小吃', '盖浇饭', '饺子',
        '小笼包', '煎饼果子', '肉夹馍', '凉皮', '酸辣粉', '过桥米线',
        '螺蛳粉', '热干面', '重庆小面', '刀削面', '烩面', 'biangbiang面',
        '粤菜', '川菜', '湘菜', '鲁菜', '苏菜', '浙菜',
        '闽菜', '徽菜', '东北菜', '西北菜', '云南菜', '贵州菜',
        '韩国料理', '日本料理', '泰国菜', '越南菜', '意大利菜', '法国菜'
    ],
    '中餐': [
        '宫保鸡丁', '麻婆豆腐', '糖醋里脊', '红烧肉', '回锅肉', '鱼香肉丝',
        '水煮鱼', '酸菜鱼', '毛血旺', '口水鸡', '辣子鸡', '东坡肉',
        '西湖醋鱼', '龙井虾仁', '叫花鸡', '狮子头', '松鼠桂鱼', '文思豆腐'
    ],
    '快餐': [
        '麦当劳', '肯德基', '必胜客', '汉堡王', '赛百味', '德克士',
        '真功夫', '吉野家', '永和大王', '李先生', '味千拉面', '大娘水饺'
    ],
    '饮品': [
        '奶茶', '咖啡', '果汁', '可乐', '雪碧', '绿茶',
        '红茶', '乌龙茶', '普洱茶', '柠檬水', '气泡水', '酸奶',
        '星巴克', '瑞幸咖啡', '喜茶', '奈雪的茶', '蜜雪冰城', 'CoCo都可'
    ],

    // 电影分类
    '电影': [
        '动作片', '喜剧片', '爱情片', '科幻片', '恐怖片', '悬疑片',
        '动画片', '纪录片', '战争片', '历史片', '奇幻片', '冒险片',
        '复仇者联盟', '蜘蛛侠', '蝙蝠侠', '钢铁侠', '美国队长', '雷神',
        '哈利波特', '指环王', '星球大战', '速度与激情', '变形金刚', '侏罗纪公园'
    ],
    ' Netflix ': [
        '怪奇物语', '纸牌屋', '毒枭', '黑镜', '王国', '爱死机',
        '后翼弃兵', '布里奇顿', '猎魔人', '暗黑', '心灵猎人', '曼达洛人'
    ],
    '国产剧': [
        '甄嬛传', '琅琊榜', '庆余年', '陈情令', '山河令', '觉醒年代',
        '山海情', '乔家的儿女', '人世间', '狂飙', '繁花', '漫长的季节'
    ],

    // 音乐分类
    '音乐': [
        '流行', '摇滚', '民谣', '爵士', '古典', '电子',
        '嘻哈', 'R&B', '乡村', '蓝调', '金属', '朋克',
        '周杰伦', '林俊杰', '陈奕迅', '邓紫棋', '薛之谦', '李荣浩',
        'Taylor Swift', 'Ed Sheeran', 'Adele', 'Beyoncé', 'Bruno Mars', 'Billie Eilish'
    ],
    '歌手': [
        '周杰伦', '林俊杰', '陈奕迅', '邓紫棋', '薛之谦', '李荣浩',
        '华晨宇', '毛不易', '周深', '单依纯', 'Taylor Swift', 'Ed Sheeran'
    ],

    // 旅游分类
    '旅游': [
        '北京', '上海', '广州', '深圳', '成都', '杭州',
        '西安', '重庆', '厦门', '三亚', '丽江', '大理',
        '桂林', '张家界', '九寨沟', '黄山', '泰山', '华山',
        '故宫', '长城', '兵马俑', '西湖', '外滩', '东方明珠'
    ],
    '出境游': [
        '日本', '韩国', '泰国', '新加坡', '马来西亚', '印度尼西亚',
        '法国', '意大利', '英国', '德国', '瑞士', '荷兰',
        '美国', '加拿大', '澳大利亚', '新西兰', '马尔代夫', '巴厘岛'
    ],
    '周边游': [
        '古镇游', '温泉度假', '农家乐', '露营', '徒步', '骑行',
        '采摘园', '海洋馆', '动物园', '游乐园', '博物馆', '美术馆'
    ],

    // 运动分类
    '运动': [
        '篮球', '足球', '羽毛球', '乒乓球', '网球', '游泳',
        '跑步', '瑜伽', '健身', '骑行', '爬山', '滑雪',
        'NBA', 'CBA', '英超', '西甲', '意甲', '德甲',
        '奥运会', '世界杯', '欧洲杯', 'NBA总决赛', '超级碗', 'F1赛车'
    ],
    '健身': [
        '深蹲', '硬拉', '卧推', '引体向上', '俯卧撑', '仰卧起坐',
        '平板支撑', '波比跳', '开合跳', '高抬腿', '卷腹', '臂屈伸',
        '跑步机', '椭圆机', '划船机', '动感单车', '哑铃', '杠铃'
    ],

    // 游戏分类
    '游戏': [
        '王者荣耀', '和平精英', '原神', '英雄联盟', 'DOTA2', 'CS:GO',
        '我的世界', '堡垒之夜', 'Apex英雄', '绝地求生', '穿越火线', '梦幻西游',
        '塞尔达传说', '马里奥', '宝可梦', '动物森友会', '集合啦！动物森友会', '健身环大冒险'
    ],
    '主机游戏': [
        'PS5', 'Xbox Series X', 'Switch', 'PS4', 'Xbox One', 'Steam Deck',
        '最后生还者', '战神', '地平线', '蜘蛛侠', '对马岛之魂', '艾尔登法环'
    ],
    '手游': [
        '王者荣耀', '和平精英', '原神', '阴阳师', '明日方舟', '崩坏：星穹铁道',
        '光遇', '蛋仔派对', '金铲铲之战', '开心消消乐', '糖果传奇', '地铁跑酷'
    ],

    // 学习分类
    '学习': [
        '英语', '数学', '语文', '物理', '化学', '生物',
        '历史', '地理', '政治', '编程', '设计', '音乐',
        '考研', '考公', '考编', '雅思', '托福', 'GRE',
        'Python', 'Java', 'JavaScript', 'C++', 'Go', 'Rust'
    ],
    '技能': [
        'PPT制作', 'Excel技巧', 'PS修图', '视频剪辑', '摄影', '写作',
        '演讲', '时间管理', '项目管理', '数据分析', 'AI工具使用', 'Prompt工程'
    ],
    '读书': [
        '三体', '活着', '百年孤独', '1984', '小王子', '追风筝的人',
        '解忧杂货店', '白夜行', '嫌疑人X的献身', '挪威的森林', '围城', '平凡的世界'
    ],

    // 购物分类
    '购物': [
        '淘宝', '京东', '拼多多', '天猫', '苏宁', '唯品会',
        '优衣库', 'ZARA', 'H&M', 'GAP', '无印良品', '宜家',
        '苹果', '华为', '小米', 'OPPO', 'vivo', '三星'
    ],
    '数码产品': [
        'iPhone', 'iPad', 'MacBook', 'AirPods', 'Apple Watch', 'Surface',
        'Switch', 'PS5', '相机', '无人机', '智能手表', '耳机'
    ],

    // 生活分类
    '生活': [
        '做饭', '打扫卫生', '洗衣服', '整理房间', '购物', '散步',
        '看电影', '听音乐', '看书', '打游戏', '运动', '睡觉',
        '约会', '聚会', '旅行', '探店', '拍照', '打卡'
    ],
    '周末活动': [
        '睡懒觉', ' brunch ', '逛公园', '看电影', '逛街', '健身',
        '烘焙', '画画', '手工DIY', '桌游', 'KTV', '密室逃脱'
    ],

    // 工作分类
    '工作': [
        '写代码', '写文档', '开会', '做PPT', '回复邮件', '整理文件',
        '代码审查', '测试', '调试bug', '优化性能', '学习新技术', '写技术博客'
    ],
    '团队建设': [
        '聚餐', 'KTV', '密室逃脱', '剧本杀', '户外拓展', '团建旅游',
        '电竞比赛', '运动会', '生日会', '下午茶', '分享会', '工作坊'
    ],

    // 决策分类
    '决定': [
        '去做', '不做', '再想想', '问问别人', '抛硬币', '听从内心',
        '冒险一试', '稳妥起见', '顺其自然', '随机应变', '坚持到底', '放弃吧'
    ],
    '心情': [
        '开心', '难过', '愤怒', '焦虑', '平静', '兴奋',
        '疲惫', '满足', '失落', '期待', '紧张', '放松'
    ]
};

// 关键词映射（用于模糊匹配）
const keywordMappings = {
    '吃': '美食',
    '喝': '饮品',
    '饭': '美食',
    '餐': '美食',
    '食': '美食',
    '饿': '美食',
    '看': '电影',
    '剧': '电影',
    '影': '电影',
    '视': 'Netflix ',
    '听': '音乐',
    '歌': '音乐',
    '曲': '音乐',
    '玩': '游戏',
    '游': '旅游',
    '旅': '旅游',
    '景': '旅游',
    '动': '运动',
    '炼': '健身',
    '学': '学习',
    '读': '读书',
    '书': '读书',
    '买': '购物',
    '购': '购物',
    '淘': '购物',
    '休': '生活',
    '闲': '生活',
    '假': '周末活动',
    '班': '工作',
    '职': '工作',
    '选': '决定',
    '择': '决定'
};

// ==================== 转盘类 ====================

class Wheel {
    constructor() {
        // DOM元素
        this.canvas = document.getElementById('wheelCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.wheelContainer = document.getElementById('wheelContainer');

        // 状态属性
        this.options = [];
        this.currentRotation = 0;
        this.isSpinning = false;
        this.wheelSize = 300;
        this.colorScheme = 'default';
        this.spinDuration = 5;
        this.maxOptions = 12;

        // 初始化
        this.init();
    }

    init() {
        this.setupCanvas();
        this.bindEvents();
        this.initSmartRecommend(); // 初始化智能推荐
        this.draw();
    }

    // 设置Canvas尺寸
    setupCanvas() {
        const size = this.wheelSize;
        const dpr = window.devicePixelRatio || 1;

        this.canvas.width = size * dpr;
        this.canvas.height = size * dpr;
        this.canvas.style.width = size + 'px';
        this.canvas.style.height = size + 'px';

        this.ctx.scale(dpr, dpr);
        this.center = { x: size / 2, y: size / 2 };
        this.radius = (size / 2) - 10; // 留出边距
    }

    // 绑定事件监听器
    bindEvents() {
        // 添加选项
        document.getElementById('addOptionBtn').addEventListener('click', () => {
            this.addOptionFromInput();
        });

        document.getElementById('optionInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addOptionFromInput();
            }
        });

        // 模板选择
        document.getElementById('templateSelect').addEventListener('change', (e) => {
            if (e.target.value) {
                this.loadTemplate(e.target.value);
                e.target.value = ''; // 重置选择
            }
        });

        // 转盘大小调节
        document.getElementById('sizeSlider').addEventListener('input', (e) => {
            this.wheelSize = parseInt(e.target.value);
            document.getElementById('sizeValue').textContent = this.wheelSize;
            this.setupCanvas();
            this.draw();
        });

        // 配色方案选择
        document.getElementById('colorScheme').addEventListener('change', (e) => {
            this.colorScheme = e.target.value;
            this.updateColorsInList();
            this.draw();
        });

        // 旋转时长调节
        document.getElementById('durationSlider').addEventListener('input', (e) => {
            this.spinDuration = parseFloat(e.target.value);
            document.getElementById('durationValue').textContent = this.spinDuration;
        });

        // 开始转动按钮
        document.getElementById('spinButton').addEventListener('click', () => {
            this.spin();
        });

        // 关闭弹窗按钮
        document.getElementById('closeModalBtn').addEventListener('click', () => {
            this.closeModal();
        });

        // 点击遮罩关闭弹窗
        document.getElementById('resultModal').addEventListener('click', (e) => {
            if (e.target.id === 'resultModal') {
                this.closeModal();
            }
        });
    }

    // 从输入框添加选项
    addOptionFromInput() {
        const input = document.getElementById('optionInput');
        const text = input.value.trim();

        if (!text) return;
        if (this.options.length >= this.maxOptions) {
            alert(`最多支持${this.maxOptions}个选项！`);
            return;
        }

        this.addOption(text);
        input.value = '';
        input.focus();
    }

    // 添加选项
    addOption(text) {
        if (this.isSpinning) return;

        this.options.push(text);
        this.renderOptionsList();
        this.updateSpinButtonState();
        this.draw();
    }

    // 删除选项
    removeOption(index) {
        if (this.isSpinning) return;

        this.options.splice(index, 1);
        this.renderOptionsList();
        this.updateSpinButtonState();
        this.draw();
    }

    // 加载预设模板
    loadTemplate(templateKey) {
        if (this.isSpinning) return;
        if (!templates[templateKey]) return;

        this.options = [...templates[templateKey]];
        this.renderOptionsList();
        this.updateSpinButtonState();
        this.draw();
    }

    // 渲染选项列表
    renderOptionsList() {
        const listEl = document.getElementById('optionsList');
        listEl.innerHTML = '';

        const colors = colorSchemes[this.colorScheme];

        this.options.forEach((option, index) => {
            const item = document.createElement('div');
            item.className = 'option-item';
            item.innerHTML = `
                <span class="option-text">${this.escapeHtml(option)}</span>
                <span class="option-color" style="background-color: ${colors[index % colors.length]}"></span>
                <button class="option-delete" data-index="${index}" title="删除">×</button>
            `;

            item.querySelector('.option-delete').addEventListener('click', () => {
                this.removeOption(index);
            });

            listEl.appendChild(item);
        });
    }

    // 更新列表中的颜色显示
    updateColorsInList() {
        const colors = colorSchemes[this.colorScheme];
        const colorElements = document.querySelectorAll('.option-color');

        colorElements.forEach((el, index) => {
            el.style.backgroundColor = colors[index % colors.length];
        });
    }

    // 更新开始按钮状态
    updateSpinButtonState() {
        const btn = document.getElementById('spinButton');
        const hint = document.getElementById('hintText');

        if (this.options.length >= 2 && !this.isSpinning) {
            btn.disabled = false;
            hint.classList.add('hidden');
        } else {
            btn.disabled = true;
            hint.classList.remove('hidden');
        }
    }

    // 绘制转盘
    draw() {
        const ctx = this.ctx;
        const centerX = this.center.x;
        const centerY = this.center.y;
        const radius = this.radius;

        // 清空画布
        ctx.clearRect(0, 0, this.wheelSize, this.wheelSize);

        // 如果没有选项，绘制空转盘提示
        if (this.options.length === 0) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.fillStyle = '#f0f0f0';
            ctx.fill();

            ctx.font = '16px -apple-system, sans-serif';
            ctx.fillStyle = '#999';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('请添加选项', centerX, centerY);
            return;
        }

        // 获取颜色方案
        const colors = colorSchemes[this.colorScheme];
        const sliceAngle = (Math.PI * 2) / this.options.length;

        // 绘制每个扇区
        this.options.forEach((option, index) => {
            const startAngle = index * sliceAngle - Math.PI / 2;
            const endAngle = startAngle + sliceAngle;

            // 绘制扇形
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.closePath();

            // 填充颜色
            ctx.fillStyle = colors[index % colors.length];
            ctx.fill();

            // 绘制边框
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.lineWidth = 2;
            ctx.stroke();

            // 绘制文字
            this.drawText(option, index, sliceAngle, centerX, centerY, radius);
        });

        // 绘制中心圆（装饰）
        ctx.beginPath();
        ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fill();
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 3;
        ctx.stroke();
    }

    // 绘制扇区文字
    drawText(text, index, sliceAngle, centerX, centerY, radius) {
        const ctx = this.ctx;

        // 计算文字位置（扇区中间）
        const textAngle = index * sliceAngle + sliceAngle / 2 - Math.PI / 2;
        const textRadius = radius * 0.65; // 文字距离中心的距离
        const textX = centerX + Math.cos(textAngle) * textRadius;
        const textY = centerY + Math.sin(textAngle) * textRadius;

        // 设置字体样式
        const fontSize = this.calculateFontSize(this.options.length);
        ctx.font = `bold ${fontSize}px -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif`;
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // 处理文字过长的情况
        let displayText = text;
        const maxWidth = (sliceAngle * radius * 0.9);
        while (ctx.measureText(displayText).width > maxWidth && displayText.length > 2) {
            displayText = displayText.slice(0, -1);
        }
        if (displayText !== text) {
            displayText += '..';
        }

        // 保存状态并旋转文字使其易于阅读
        ctx.save();
        ctx.translate(textX, textY);

        // 让文字沿着半径方向排列
        const rotation = textAngle + Math.PI / 2;
        if (rotation > Math.PI / 2 && rotation < Math.PI * 1.5) {
            // 下半部分的文字翻转180度，保持可读性
            ctx.rotate(rotation + Math.PI);
        } else {
            ctx.rotate(rotation);
        }

        // 添加文字阴影效果
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 3;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;

        ctx.fillText(displayText, 0, 0);
        ctx.restore();
    }

    // 计算字体大小（根据选项数量动态调整）
    calculateFontSize(optionCount) {
        if (optionCount <= 4) return 18;
        if (optionCount <= 6) return 15;
        if (optionCount <= 8) return 13;
        if (optionCount <= 10) return 11;
        return 10;
    }

    // 开始旋转
    spin() {
        if (this.isSpinning || this.options.length < 2) return;

        this.isSpinning = true;

        // 更新UI状态
        const spinBtn = document.getElementById('spinButton');
        spinBtn.disabled = true;
        spinBtn.classList.add('spinning');
        spinBtn.textContent = '转动中...';

        // 禁用所有控制
        this.setControlsEnabled(false);

        // 生成随机角度
        const spins = 3 + Math.floor(Math.random() * 6); // 3-8圈
        const randomOffset = Math.random() * 360;       // 随机偏移
        const totalRotation = spins * 360 + randomOffset;

        // 更新当前旋转角度
        this.currentRotation += totalRotation;

        // 应用CSS变换和动画
        this.canvas.style.transition = `transform ${this.spinDuration}s cubic-bezier(0.17, 0.67, 0.12, 0.99)`;
        this.canvas.style.transform = `rotate(${this.currentRotation}deg)`;

        // 监听动画结束
        setTimeout(() => {
            this.onSpinComplete();
        }, this.spinDuration * 1000 + 100); // 额外100ms确保动画完成
    }

    // 旋转完成处理
    onSpinComplete() {
        // 计算最终选中的索引
        const normalizedAngle = this.currentRotation % 360;
        const sliceAngle = 360 / this.options.length;

        // 指针在顶部（270度或-90度），需要计算哪个扇区指向指针
        // 由于canvas的rotate是顺时针，我们需要反向计算
        const pointerAngle = 360 - normalizedAngle; // 指针相对于转盘的角度
        const selectedIndex = Math.floor(pointerAngle / sliceAngle) % this.options.length;

        // 显示结果
        this.showResult(this.options[selectedIndex]);

        // 重置状态
        this.isSpinning = false;

        // 更新UI状态
        const spinBtn = document.getElementById('spinButton');
        spinBtn.classList.remove('spinning');
        spinBtn.textContent = '再转一次';
        spinBtn.disabled = false;

        // 启用控制
        this.setControlsEnabled(true);
    }

    // 显示结果弹窗
    showResult(result) {
        document.getElementById('resultText').textContent = result;
        document.getElementById('resultModal').classList.add('show');
    }

    // 关闭结果弹窗
    closeModal() {
        document.getElementById('resultModal').classList.remove('show');
    }

    // 启用/禁用控制面板
    setControlsEnabled(enabled) {
        document.getElementById('optionInput').disabled = !enabled;
        document.getElementById('addOptionBtn').disabled = !enabled;
        document.getElementById('templateSelect').disabled = !enabled;
        document.getElementById('sizeSlider').disabled = !enabled;
        document.getElementById('colorScheme').disabled = !enabled;
        document.getElementById('durationSlider').disabled = !enabled;

        // 删除按钮的状态
        const deleteButtons = document.querySelectorAll('.option-delete');
        deleteButtons.forEach(btn => {
            btn.disabled = !enabled;
            btn.style.opacity = enabled ? '1' : '0.5';
        });
    }

    // HTML转义（防止XSS）
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ==================== 智能推荐功能 ====================

    // 初始化智能推荐事件绑定
    initSmartRecommend() {
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');

        // 搜索按钮点击
        searchBtn.addEventListener('click', () => {
            this.performSearch();
        });

        // 回车键搜索
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch();
            }
        });

        // 热门标签点击
        document.querySelectorAll('.tag-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;
                this.loadCategoryRecommendations(category);
            });
        });

        // 全部导入按钮
        document.getElementById('importAllBtn').addEventListener('click', () => {
            this.importAllRecommendations();
        });

        // 清空推荐按钮
        document.getElementById('clearRecommendBtn').addEventListener('click', () => {
            this.clearRecommendations();
        });
    }

    // 执行搜索
    performSearch() {
        const searchInput = document.getElementById('searchInput');
        const keyword = searchInput.value.trim();

        if (!keyword) {
            this.showRecommendPlaceholder('请输入搜索关键词');
            return;
        }

        // 显示加载状态
        this.showSearchLoading();

        // 模拟网络延迟（实际应用中这里可以调用真实的API）
        setTimeout(() => {
            const results = this.searchRecommendations(keyword);
            this.displayRecommendations(results, keyword);
        }, 500);
    }

    // 搜索推荐选项
    searchRecommendations(keyword) {
        const results = [];
        const keywordLower = keyword.toLowerCase();

        // 1. 精确匹配分类
        if (recommendationDatabase[keyword]) {
            results.push(...recommendationDatabase[keyword]);
        }

        // 2. 关键词模糊匹配
        for (const [key, value] of Object.entries(keywordMappings)) {
            if (keywordLower.includes(key)) {
                const category = keywordMappings[key];
                if (recommendationDatabase[category]) {
                    recommendationDatabase[category].forEach(item => {
                        if (!results.includes(item)) {
                            results.push(item);
                        }
                    });
                }
            }
        }

        // 3. 在所有分类中模糊搜索包含关键词的项
        for (const [category, items] of Object.entries(recommendationDatabase)) {
            items.forEach(item => {
                if (item.toLowerCase().includes(keywordLower) && !results.includes(item)) {
                    results.push(item);
                }
            });
        }

        // 4. 如果本地没有结果，生成一些基于关键词的创意建议
        if (results.length === 0) {
            results.push(
                `${keyword}方案A`,
                `${keyword}方案B`,
                `${keyword}方案C`,
                `${keyword}备选1`,
                `${keyword}备选2`,
                `关于${keyword}的其他选择`
            );
        }

        // 去重并限制数量
        const uniqueResults = [...new Set(results)];
        return uniqueResults.slice(0, 12); // 最多显示12个推荐
    }

    // 加载分类推荐
    loadCategoryRecommendations(category) {
        // 显示加载状态
        this.showSearchLoading();

        // 模拟延迟
        setTimeout(() => {
            if (recommendationDatabase[category]) {
                const results = [...recommendationDatabase[category]].slice(0, 12);
                this.displayRecommendations(results, category);
            } else {
                this.showNoResults();
            }
        }, 300);

        // 更新搜索框内容
        document.getElementById('searchInput').value = category;
    }

    // 显示推荐结果
    displayRecommendations(results, keyword) {
        const container = document.getElementById('recommendResults');
        const batchActions = document.getElementById('batchActions');

        if (results.length === 0) {
            this.showNoResults();
            return;
        }

        // 清空容器
        container.innerHTML = '';

        // 创建推荐项
        results.forEach((item, index) => {
            const recommendItem = document.createElement('div');
            recommendItem.className = 'recommend-item';
            recommendItem.style.animationDelay = `${index * 0.05}s`;

            // 检查是否已添加
            const isAlreadyAdded = this.options.includes(item);

            recommendItem.innerHTML = `
                <span class="recommend-item-text">${this.escapeHtml(item)}</span>
                <button class="recommend-item-add ${isAlreadyAdded ? 'added' : ''}"
                        data-item="${this.escapeHtml(item)}">
                    ${isAlreadyAdded ? '已添加' : '+ 添加'}
                </button>
            `;

            // 绑定添加事件
            const addBtn = recommendItem.querySelector('.recommend-item-add');
            addBtn.addEventListener('click', () => {
                this.addSingleRecommendation(item, addBtn);
            });

            container.appendChild(recommendItem);
        });

        // 显示批量操作按钮
        batchActions.style.display = 'flex';
    }

    // 添加单个推荐项
    addSingleRecommendation(item, button) {
        if (this.options.length >= this.maxOptions) {
            alert(`最多支持${this.maxOptions}个选项！`);
            return;
        }

        if (this.options.includes(item)) {
            alert('该选项已存在！');
            return;
        }

        // 添加到转盘
        this.addOption(item);

        // 更新按钮状态
        button.textContent = '已添加';
        button.classList.add('added');
        button.disabled = true;

        // 添加成功动画
        button.style.transform = 'scale(1.2)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 200);
    }

    // 导入全部推荐
    importAllRecommendations() {
        const items = document.querySelectorAll('.recommend-item');
        let importedCount = 0;

        items.forEach(itemEl => {
            const itemText = itemEl.querySelector('.recommend-item-text').textContent;
            const addButton = itemEl.querySelector('.recommend-item-add');

            if (!this.options.includes(itemText) && this.options.length < this.maxOptions) {
                this.addOption(itemText);
                addButton.textContent = '已添加';
                addButton.classList.add('added');
                addButton.disabled = true;
                importedCount++;
            }
        });

        if (importedCount > 0) {
            // 显示导入成功提示
            this.showToast(`✅ 成功导入 ${importedCount} 个选项！`);
        } else {
            alert('没有可导入的新选项或已达到最大限制！');
        }
    }

    // 清空推荐
    clearRecommendations() {
        const container = document.getElementById('recommendResults');
        const batchActions = document.getElementById('batchActions');
        const searchInput = document.getElementById('searchInput');

        container.innerHTML = '<p class="placeholder-text">输入关键词或点击热门标签获取推荐选项</p>';
        batchActions.style.display = 'none';
        searchInput.value = '';
    }

    // 显示加载状态
    showSearchLoading() {
        const container = document.getElementById('recommendResults');
        container.innerHTML = '<p class="search-loading">正在搜索中</p>';
        document.getElementById('batchActions').style.display = 'none';
    }

    // 显示占位符文本
    showRecommendPlaceholder(text) {
        const container = document.getElementById('recommendResults');
        container.innerHTML = `<p class="placeholder-text">${text}</p>`;
        document.getElementById('batchActions').style.display = 'none';
    }

    // 显示无结果提示
    showNoResults() {
        const container = document.getElementById('recommendResults');
        container.innerHTML = '<p class="no-results">未找到相关推荐，请尝试其他关键词</p>';
        document.getElementById('batchActions').style.display = 'none';
    }

    // 显示Toast提示
    showToast(message) {
        // 移除已有的toast
        const existingToast = document.querySelector('.toast-notification');
        if (existingToast) {
            existingToast.remove();
        }

        // 创建新的toast
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 6px 20px rgba(17, 153, 142, 0.4);
            z-index: 10000;
            animation: toastSlideIn 0.3s ease, toastFadeOut 0.3s ease 2.7s;
            font-weight: 600;
            font-size: 14px;
        `;

        document.body.appendChild(toast);

        // 3秒后自动移除
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 3000);
    }
}

// ==================== 初始化应用 ====================

document.addEventListener('DOMContentLoaded', () => {
    // 创建转盘实例
    const wheel = new Wheel();

    // 注册 Service Worker
    registerServiceWorker();

    // 初始化 PWA 安装提示
    initPWAPrompt();

    // 响应窗口大小变化
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            wheel.setupCanvas();
            wheel.draw();
        }, 250);
    });

    // 触摸设备优化：防止双击缩放
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // 检测是否从模板快捷方式打开
    const urlParams = new URLSearchParams(window.location.search);
    const templateParam = urlParams.get('template');
    if (templateParam && templates[templateParam]) {
        wheel.loadTemplate(templateParam);
    }

    console.log('幸运转盘已初始化！');
});

// ==================== PWA 功能 ====================

// 注册 Service Worker
async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js');
            console.log('[PWA] Service Worker 注册成功:', registration.scope);

            // 检查更新
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        // 新版本可用，提示用户刷新
                        showUpdateNotification();
                    }
                });
            });
        } catch (error) {
            console.error('[PWA] Service Worker 注册失败:', error);
        }
    }
}

// PWA 安装提示
let deferredPrompt;

function initPWAPrompt() {
    const installPrompt = document.getElementById('installPrompt');
    const installBtn = document.getElementById('installBtn');
    const closeBtn = document.getElementById('closeInstallPrompt');

    // 监听 beforeinstallprompt 事件
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;

        // 检查用户之前是否已经安装或关闭过提示
        const isDismissed = localStorage.getItem('pwa-install-dismissed');
        const isInstalled = localStorage.getItem('pwa-installed');

        if (!isDismissed && !isInstalled) {
            // 延迟显示安装提示（让用户先体验一下）
            setTimeout(() => {
                installPrompt.classList.add('show');
            }, 3000); // 3秒后显示
        }
    });

    // 监听安装成功事件
    window.addEventListener('appinstalled', () => {
        console.log('[PWA] 应用已安装到主屏幕');
        localStorage.setItem('pwa-installed', 'true');
        installPrompt.classList.remove('show');
        deferredPrompt = null;

        // 显示安装成功提示
        showToastMessage('✅ 已成功安装到主屏幕！', 'success');
    });

    // 安装按钮点击
    installBtn.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log('[PWA] 用户安装选择:', outcome);
            deferredPrompt = null;
        }
        installPrompt.classList.remove('show');
    });

    // 关闭按钮点击
    closeBtn.addEventListener('click', () => {
        installPrompt.classList.remove('show');
        localStorage.setItem('pwa-install-dismissed', 'true');

        // 7天后再次提示（可选）
        setTimeout(() => {
            localStorage.removeItem('pwa-install-dismissed');
        }, 7 * 24 * 60 * 60 * 1000);
    });
}

// 显示更新通知
function showUpdateNotification() {
    const notification = document.createElement('div');
    notification.className = 'update-notification';
    notification.innerHTML = `
        <span>🔄 发现新版本，点击刷新获取最新功能</span>
        <button onclick="location.reload()">立即更新</button>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 50px;
        box-shadow: 0 6px 20px rgba(17, 153, 142, 0.4);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 15px;
        font-weight: 600;
        animation: slideDown 0.4s ease;
    `;

    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from { opacity: 0; transform: translateX(-50%) translateY(-50px); }
            to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .update-notification button {
            background: white;
            color: #11998e;
            border: none;
            padding: 8px 18px;
            border-radius: 20px;
            font-weight: 700;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(notification);

    // 10秒后自动消失
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 10000);
}

// Toast 消息（全局）
function showToastMessage(message, type = 'info') {
    const toast = document.createElement('div');
    toast.textContent = message;
    
    const colors = {
        success: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
        error: 'linear-gradient(135deg, #eb3349 0%, #f45c43 100%)',
        info: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    };

    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: toastSlideIn 0.3s ease, toastFadeOut 0.3s ease 2.7s;
        font-weight: 600;
        font-size: 14px;
        max-width: 80vw;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 3000);
}
