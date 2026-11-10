/**
 * 幸运转盘 · Carnival Wheel
 * 嘉年华霓虹风格增强版
 */

// ==================== 配置数据 ====================

const colorSchemes = {
    default:  ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9', '#F1948A', '#82E0AA'],
    carnival: ['#ff2e93', '#ffcc33', '#00ff9d', '#00f0ff', '#b400ff', '#ff6b35', '#ff2e93', '#00f0ff', '#ffe500', '#00ff9d', '#b400ff', '#ff6b35'],
    warm:     ['#FF6B6B', '#FF8E53', '#FFA07A', '#FFD700', '#FF7F50', '#FF69B4', '#FF4500', '#FF6347', '#FFA500', '#FFE4B5', '#FF1493', '#FFDAB9'],
    cool:     ['#4ECDC4', '#45B7D1', '#5DADE2', '#3498DB', '#85C1E9', '#AED6F1', '#BB8FCE', '#9B59B6', '#82E0AA', '#58D68D', '#48C9B0', '#76D7C4'],
    macaron:  ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF', '#E0BBE4', '#FFC8DD', '#BDE0FE', '#A2D2FF', '#CDFADB', '#FFD6A5', '#FDFFB6'],
    gold:     ['#FFD700', '#FFA500', '#FF8C00', '#B8860B', '#DAA520', '#CD853F', '#F4A460', '#DEB887', '#D2691E', '#8B4513', '#E0A96D', '#C9A227'],
    rainbow:  ['#ff2e2e', '#ff8a00', '#ffe500', '#00ff3c', '#00e0ff', '#4a6bff', '#b400ff', '#ff2e93', '#ff8a00', '#ffe500', '#00ff3c', '#00e0ff'],
};

const templates = {
    breakfast: ['包子', '油条豆浆', '煎饼果子', '三明治', '牛奶鸡蛋', '粥+小菜', '手抓饼', '肠粉'],
    lunch:     ['麻辣烫', '黄焖鸡', '兰州拉面', '沙县小吃', '盖浇饭', '饺子', '汉堡', '寿司'],
    dinner:    ['火锅', '烧烤', '日料', '西餐厅', '串串', '小龙虾', '牛排', '烤肉'],
    date:      ['看电影', '公园散步', '咖啡厅', '逛美术馆', '逛街', '游乐园', '海边', '咖啡馆'],
    drink:     ['奶茶', '咖啡', '果汁', '气泡水', '柠檬茶', '啤酒', '红酒', '威士忌'],
    game:      ['王者荣耀', '原神', '和平精英', '塞尔达', '我的世界', '马里奥', '英雄联盟', 'CS2'],
    task:      ['写报告', '开会', '代码审查', '文档整理', '测试', '优化', '学习新技术', '摸鱼'],
    number:    ['1', '2', '3', '4', '5', '6', '7', '8'],
    range:     '__CUSTOM_RANGE__',  // 特殊标志：触发弹窗让用户填 min/max 生成精确数字
    yesno:     ['是', '否'],
    coin:      ['正面', '反面'],
};

// 搜索关键词映射
const keywordMappings = {
    '吃': '美食', '喝': '饮品', '饭': '美食', '餐': '美食', '饿': '美食',
    '看': '电影', '剧': '电影', '影': '电影',
    '听': '音乐', '歌': '音乐', '曲': '音乐',
    '玩': '游戏', '游': '旅游', '旅': '旅游', '景': '旅游',
    '动': '运动', '炼': '健身',
    '学': '学习', '读': '读书', '书': '读书',
    '买': '购物', '购': '购物', '淘': '购物',
};

const recommendationDatabase = {
    '美食': ['火锅', '烧烤', '寿司', '披萨', '汉堡', '炸鸡', '麻辣烫', '黄焖鸡', '兰州拉面', '沙县小吃', '小笼包', '煎饼果子'],
    '中餐': ['宫保鸡丁', '麻婆豆腐', '糖醋里脊', '红烧肉', '回锅肉', '鱼香肉丝', '水煮鱼', '酸菜鱼'],
    '快餐': ['麦当劳', '肯德基', '必胜客', '汉堡王', '赛百味', '德克士'],
    '饮品': ['奶茶', '咖啡', '果汁', '可乐', '绿茶', '柠檬水', '气泡水', '酸奶'],
    '电影': ['动作片', '喜剧片', '爱情片', '科幻片', '恐怖片', '悬疑片', '动画片'],
    '电视剧': ['国产剧', '韩剧', '美剧', '日剧', '英剧', '泰剧'],
    '音乐': ['流行', '摇滚', '民谣', '爵士', '古典', '电子', '嘻哈', 'R&B'],
    '旅游': ['北京', '上海', '广州', '成都', '杭州', '西安', '重庆', '厦门', '三亚'],
    '出境游': ['日本', '韩国', '泰国', '法国', '意大利', '英国', '美国', '马尔代夫'],
    '运动': ['篮球', '足球', '羽毛球', '乒乓球', '网球', '游泳', '跑步', '瑜伽', '健身'],
    '游戏': ['王者荣耀', '原神', '和平精英', '英雄联盟', 'DOTA2', '我的世界', '塞尔达', '马里奥'],
    '学习': ['英语', '数学', '编程', '设计', '历史', '地理', '考研', '考公'],
    '读书': ['三体', '活着', '百年孤独', '1984', '小王子', '追风筝的人', '解忧杂货店'],
    '购物': ['淘宝', '京东', '拼多多', '天猫', '唯品会', '优衣库', 'ZARA'],
    '生活': ['做饭', '打扫', '购物', '散步', '看电影', '听音乐', '看书', '运动', '睡觉'],
    '周末活动': ['睡懒觉', 'brunch', '逛公园', '看电影', '逛街', '健身', '烘焙', '桌游', 'KTV'],
    '工作': ['写代码', '写文档', '开会', '做PPT', '回复邮件', '代码审查', '测试', '学习新技术'],
    '决定': ['去做', '不做', '再想想', '问问别人', '抛硬币', '听从内心', '冒险一试', '稳妥起见'],
    '心情': ['开心', '难过', '愤怒', '焦虑', '平静', '兴奋', '疲惫', '放松'],
};

// ==================== 音效（已移除）====================
const sound = {
    toggle() {}, ensureCtx() {},
    click() {}, addOpt() {}, spinStart() {}, win() {}, pop() {},
    enabled: false
};

// ==================== 撒花粒子系统 ====================

class Confetti {
    constructor(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.running = false;
        this.enabled = true;
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = window.innerWidth * dpr;
        this.canvas.height = window.innerHeight * dpr;
        this.canvas.style.width = window.innerWidth + 'px';
        this.canvas.style.height = window.innerHeight + 'px';
        this.ctx.scale(dpr, dpr);
    }

    burst(count = 120) {
        if (!this.enabled) return;
        const colors = ['#ff2e93', '#ffcc33', '#00ff9d', '#00f0ff', '#b400ff', '#ffe500', '#ff6b35'];
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * window.innerWidth,
                y: -10 - Math.random() * 100,
                vx: (Math.random() - 0.5) * 5,
                vy: Math.random() * 4 + 2,
                size: Math.random() * 8 + 4,
                rot: Math.random() * Math.PI * 2,
                vrot: (Math.random() - 0.5) * 0.3,
                color: colors[Math.floor(Math.random() * colors.length)],
                life: 0,
                maxLife: 180 + Math.random() * 120,
            });
        }
        this.particles.sort(() => Math.random() - 0.5);
        this.start();
    }

    start() {
        if (this.running) return;
        this.running = true;
        this.loop();
    }

    loop() {
        if (!this.running) return;
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        let alive = 0;
        for (const p of this.particles) {
            p.x += p.vx;
            p.y += p.vy;
            p.rot += p.vrot;
            p.vy += 0.04; // 重力
            p.life++;

            const alpha = Math.max(0, 1 - p.life / p.maxLife);
            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(p.rot);
            this.ctx.globalAlpha = alpha;
            this.ctx.fillStyle = p.color;
            this.ctx.shadowColor = p.color;
            this.ctx.shadowBlur = 6;
            this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
            this.ctx.restore();

            if (p.life < p.maxLife && p.y < window.innerHeight + 30) alive++;
        }
        this.particles = this.particles.filter(p => p.life < p.maxLife && p.y < window.innerHeight + 30);
        if (alive === 0) { this.running = false; return; }
        requestAnimationFrame(() => this.loop());
    }
}

let confetti;

// ==================== 历史记录 ====================

const historyStore = {
    KEY: 'wheel-history-v2',
    MAX: 20,
    load() {
        try { return JSON.parse(localStorage.getItem(this.KEY)) || []; }
        catch { return []; }
    },
    save(list) {
        try { localStorage.setItem(this.KEY, JSON.stringify(list.slice(0, this.MAX))); }
        catch {}
    },
    push(result) {
        const list = this.load();
        list.unshift({ text: result, time: Date.now() });
        this.save(list);
    },
    clear() { localStorage.removeItem(this.KEY); },
};

// ==================== 历史转盘（配置快照） ====================
// 存整个转盘的配置（options + colorScheme + spinDuration + wheelSize），最多 10 条
const presetStore = {
    KEY: 'wheel-presets-v1',
    MAX: 10,
    load() {
        try { return JSON.parse(localStorage.getItem(this.KEY)) || []; }
        catch { return []; }
    },
    save(list) {
        const trimmed = list.slice(0, this.MAX);
        localStorage.setItem(this.KEY, JSON.stringify(trimmed));
    },
    add(snapshot) {
        const list = this.load();
        list.unshift(snapshot);          // 最新在最前
        this.save(list);
    },
    remove(id) {
        const list = this.load().filter(s => s.id !== id);
        this.save(list);
    },
    clear() { localStorage.removeItem(this.KEY); },
};

function renderHistory() {
    const el = document.getElementById('historyList');
    const list = historyStore.load();
    if (list.length === 0) {
        el.innerHTML = '<p class="placeholder-text">还没有抽奖记录</p>';
        return;
    }
    el.innerHTML = list.map(item => {
        const t = new Date(item.time);
        const hh = String(t.getHours()).padStart(2, '0');
        const mm = String(t.getMinutes()).padStart(2, '0');
        const mmd = `${t.getMonth() + 1}/${t.getDate()}`;
        return `<div class="history-item"><span class="history-name">🎲 ${escapeHtml(item.text)}</span><span class="history-time">${mmd} ${hh}:${mm}</span></div>`;
    }).join('');
}

// ==================== 主题切换 ====================

function applyTheme(theme) {
    document.body.dataset.theme = theme;
    localStorage.setItem('wheel-theme', theme);
}

function initTheme() {
    const saved = localStorage.getItem('wheel-theme');
    if (saved) {
        applyTheme(saved);
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        applyTheme('light');
    }
    const btn = document.getElementById('themeToggle');
    btn?.addEventListener('click', () => {
        const next = document.body.dataset.theme === 'light' ? 'dark' : 'light';
        applyTheme(next);
        sound.pop();
    });
}

// ==================== 转盘核心 ====================

class Wheel {
    constructor() {
        this.canvas = document.getElementById('wheelCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.frame = document.getElementById('wheelContainer');

        this.options = [];
        this.currentRotation = 0;
        this.isSpinning = false;
        this.wheelSize = 300;
        this.colorScheme = 'default';
        this.spinDuration = 5;
        this.maxOptions = 12;

        this.init();
    }

    init() {
        this.setupCanvas();
        this.bindEvents();
        this.initRecommend();
        this.draw();
    }

    setupCanvas() {
        const size = this.wheelSize;
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = size * dpr;
        this.canvas.height = size * dpr;
        this.canvas.style.width = size + 'px';
        this.canvas.style.height = size + 'px';
        this.ctx.scale(dpr, dpr);
        this.center = { x: size / 2, y: size / 2 };
        this.radius = size / 2 - 12;

        // 同步 frame 尺寸
        if (this.frame) {
            this.frame.style.width = size + 'px';
            this.frame.style.height = size + 'px';
        }
    }

    bindEvents() {
        // 添加选项
        document.getElementById('addOptionBtn').addEventListener('click', () => this.addFromInput());
        document.getElementById('optionInput').addEventListener('keypress', e => {
            if (e.key === 'Enter') this.addFromInput();
        });

        // 模板
        document.getElementById('templateSelect').addEventListener('change', e => {
            if (e.target.value) { this.loadTemplate(e.target.value); e.target.value = ''; }
        });

        // 大小
        const sizeSlider = document.getElementById('sizeSlider');
        sizeSlider.addEventListener('input', e => {
            this.wheelSize = parseInt(e.target.value);
            document.getElementById('sizeValue').textContent = this.wheelSize;
            this.setupCanvas();
            this.draw();
            updateRangeFill(sizeSlider);
        });
        updateRangeFill(sizeSlider);

        // 配色
        document.getElementById('colorScheme').addEventListener('change', e => {
            this.colorScheme = e.target.value;
            this.updateColorsInList();
            this.draw();
            sound.pop();
        });

        // 时长
        const durationSlider = document.getElementById('durationSlider');
        durationSlider.addEventListener('input', e => {
            this.spinDuration = parseFloat(e.target.value);
            document.getElementById('durationValue').textContent = this.spinDuration;
            updateRangeFill(durationSlider);
        });
        updateRangeFill(durationSlider);

        // 开始按钮（三个入口：spinButton / centerBtn / 点击转盘画布本身）
        const spinBtn = document.getElementById('spinButton');
        const centerBtn = document.getElementById('spinCenterBtn');
        const frame = document.getElementById('wheelContainer');
        spinBtn.addEventListener('click', () => this.spin());
        // center-btn 已设 pointer-events:none → 它下面的 canvas 接住点击
        // 额外让整个 wheel-frame 和 canvas 都能点击触发
        frame?.addEventListener('click', () => this.spin());
        document.getElementById('wheelCanvas')?.addEventListener('click', () => this.spin());

        // 弹窗
        document.getElementById('closeModalBtn').addEventListener('click', () => this.closeModal());
        document.getElementById('copyResultBtn')?.addEventListener('click', () => {
            const text = document.getElementById('resultText')?.textContent;
            if (text) {
                navigator.clipboard?.writeText(text).then(() => {
                    showToast('✅ 已复制');
                }).catch(() => {
                    showToast('已复制：' + text);
                });
            }
            sound.pop();
        });
        document.getElementById('resultModal').addEventListener('click', e => {
            if (e.target.id === 'resultModal') this.closeModal();
        });

        // 数字范围弹窗
        const rangeMin = document.getElementById('rangeMin');
        const rangeMax = document.getElementById('rangeMax');
        const rangePrev = document.getElementById('rangePreview');
        const updateRangePreview = () => {
            const mn = parseInt(rangeMin.value, 10);
            const mx = parseInt(rangeMax.value, 10);
            if (!Number.isNaN(mn) && !Number.isNaN(mx) && mn < mx) {
                rangePrev.textContent = `${mx - mn + 1} 个数字（${mn} ~ ${mx}）`;
            } else if (!Number.isNaN(mn) && !Number.isNaN(mx)) {
                rangePrev.textContent = '⚠️ 最小值需小于最大值';
            } else {
                rangePrev.textContent = '请输入数字';
            }
        };
        rangeMin?.addEventListener('input', updateRangePreview);
        rangeMax?.addEventListener('input', updateRangePreview);
        document.getElementById('rangeConfirmBtn').addEventListener('click', applyNumberRange);
        document.getElementById('rangeCancelBtn').addEventListener('click', closeRangeModal);
        document.getElementById('rangeModal').addEventListener('click', e => {
            if (e.target.id === 'rangeModal') closeRangeModal();
        });

        // 历史清空
        document.getElementById('clearHistoryBtn')?.addEventListener('click', () => {
            if (confirm('确定要清空所有历史记录吗？')) {
                historyStore.clear();
                renderHistory();
                showToast('历史已清空');
                sound.pop();
            }
        });

        // 开关
        document.getElementById('confettiToggle').addEventListener('change', e => {
            if (confetti) confetti.enabled = e.target.checked;
            sound.pop();
        });
        document.getElementById('historyToggle').addEventListener('change', e => {
            const panel = document.getElementById('historyPanel');
            if (panel) panel.style.display = e.target.checked ? '' : 'none';
            sound.pop();
        });

        // 音效已移除
    }

    addFromInput() {
        const input = document.getElementById('optionInput');
        const text = input.value.trim();
        if (!text) return;
        if (this.options.length >= this.maxOptions) {
            showToast(`最多支持 ${this.maxOptions} 个选项！`);
            return;
        }
        this.addOption(text);
        input.value = '';
        input.focus();
        sound.addOpt();
    }

    addOption(text) {
        if (this.isSpinning) return;
        this.options.push(text);
        this.renderOptionsList();
        this.updateSpinState();
        this.draw();
    }

    removeOption(index) {
        if (this.isSpinning) return;
        this.options.splice(index, 1);
        this.renderOptionsList();
        this.updateSpinState();
        this.draw();
        sound.pop();
    }

    loadTemplate(key) {
        if (this.isSpinning) return;
        if (key === 'range') { openRangeModal(); return; }
        const tpl = templates[key];
        if (!tpl) return;
        this.options = [...tpl];
        this.renderOptionsList();
        this.updateSpinState();
        this.draw();
        sound.click();
        showToast('已加载模板');
    }

    // --- 保存 / 恢复 转盘配置快照 ---

    saveCurrentAsPreset(name) {
        if (this.options.length < 2) { showToast('至少需要 2 个选项才能保存'); return null; }
        const snapshot = {
            id: 'preset_' + Date.now(),
            name: name || this.options[0] + (this.options.length > 1 ? ` 等${this.options.length}项` : ''),
            createdAt: Date.now(),
            config: {
                options: [...this.options],
                colorScheme: this.colorScheme,
                spinDuration: this.spinDuration,
                wheelSize: this.wheelSize,
            },
        };
        presetStore.add(snapshot);
        sound.click();
        return snapshot;
    }

    applyPreset(snapshot) {
        if (this.isSpinning) return;
        const cfg = snapshot.config;
        // 1. 应用配置
        this.options = [...cfg.options];
        this.colorScheme = cfg.colorScheme;
        this.spinDuration = cfg.spinDuration;
        this.wheelSize = cfg.wheelSize;
        // 2. 同步控制面板 DOM 值
        const sizeSlider = document.getElementById('sizeSlider');
        const sizeValue = document.getElementById('sizeValue');
        const durationSlider = document.getElementById('durationSlider');
        const durationValue = document.getElementById('durationValue');
        const colorSelect = document.getElementById('colorScheme');
        if (sizeSlider) sizeSlider.value = this.wheelSize;
        if (sizeValue) sizeValue.textContent = this.wheelSize;
        if (durationSlider) durationSlider.value = this.spinDuration;
        if (durationValue) durationValue.textContent = this.spinDuration;
        if (colorSelect) colorSelect.value = this.colorScheme;
        // 3. 重绘 canvas + 刷新 UI
        this.setupCanvas();
        this.renderOptionsList();
        this.updateColorsInList();
        this.updateSpinState();
        this.draw();
        // 4. 恢复主题（如果有）
        if (localStorage.getItem('wheel-theme')) {
            const theme = localStorage.getItem('wheel-theme');
            const themeIcon = document.getElementById('themeIcon');
            document.body.dataset.theme = theme;
            if (themeIcon) themeIcon.innerHTML = theme === 'light'
                ? '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>'
                : '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
        }
        sound.click();
        showToast(`已恢复「${snapshot.name}」`);
    }

    renderOptionsList() {
        const listEl = document.getElementById('optionsList');
        listEl.innerHTML = '';
        const colors = colorSchemes[this.colorScheme];
        this.options.forEach((opt, i) => {
            const item = document.createElement('div');
            item.className = 'option-item';
            item.innerHTML = `
                <span class="option-color" style="background-color:${colors[i % colors.length]}"></span>
                <span class="option-text">${escapeHtml(opt)}</span>
                <button class="option-delete" title="删除">✕</button>
            `;
            item.querySelector('.option-delete').addEventListener('click', () => this.removeOption(i));
            listEl.appendChild(item);
        });
    }

    updateColorsInList() {
        const colors = colorSchemes[this.colorScheme];
        document.querySelectorAll('.option-color').forEach((el, i) => {
            el.style.backgroundColor = colors[i % colors.length];
        });
    }

    updateSpinState() {
        const btn = document.getElementById('spinButton');
        const hint = document.getElementById('hintText');
        const center = document.getElementById('spinCenterBtn');
        const ready = this.options.length >= 2 && !this.isSpinning;
        btn.disabled = !ready;
        if (center) center.disabled = !ready;
        hint?.classList.toggle('hidden', ready);
    }

    // --- 绘制 ---
    draw() {
        const ctx = this.ctx;
        const cx = this.center.x, cy = this.center.y, r = this.radius;
        ctx.clearRect(0, 0, this.wheelSize, this.wheelSize);

        if (this.options.length === 0) {
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(30, 20, 55, 0.5)';
            ctx.fill();
            ctx.strokeStyle = 'rgba(255, 46, 147, 0.35)';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.font = '15px "Noto Sans SC", sans-serif';
            ctx.fillStyle = 'rgba(180, 170, 210, 0.7)';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('请添加选项', cx, cy);
            return;
        }

        const colors = colorSchemes[this.colorScheme];
        const slice = (Math.PI * 2) / this.options.length;

        this.options.forEach((opt, i) => {
            const start = i * slice - Math.PI / 2;
            const end = start + slice;

            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.arc(cx, cy, r, start, end);
            ctx.closePath();
            ctx.fillStyle = colors[i % colors.length];
            ctx.fill();

            // 扇区外发光（嘉年华效果）
            ctx.save();
            ctx.shadowColor = colors[i % colors.length];
            ctx.shadowBlur = 14;
            ctx.strokeStyle = 'rgba(255,255,255,0.6)';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.restore();

            this.drawText(opt, i, slice, cx, cy, r, colors[i % colors.length]);
        });

        // 中心装饰环
        ctx.beginPath();
        ctx.arc(cx, cy, 30, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(10, 5, 25, 0.95)';
        ctx.fill();
        ctx.save();
        ctx.strokeStyle = '#ffcc33';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#ffcc33';
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.restore();
    }

    drawText(text, i, slice, cx, cy, r, color) {
        const ctx = this.ctx;
        const fontSize = this.calcFontSize(this.options.length);
        ctx.font = `bold ${fontSize}px "Noto Sans SC", sans-serif`;

        // 根据扇区颜色选择文字色
        const lum = hexLuminance(color);
        ctx.fillStyle = lum > 0.5 ? '#1a0b2e' : '#ffffff';
        ctx.shadowColor = 'rgba(0,0,0,0.45)';
        ctx.shadowBlur = 2;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // 扇区的起止角
        const startAngle = i * slice - Math.PI / 2;
        const endAngle = startAngle + slice;
        // 文字所在半径 —— 推到更外圈，避开中心 GO 按钮
        const textR = r * 0.78;

        // 计算文字是否需要截断
        let display = text;
        const maxW = slice * textR * 0.82; // 弧度 × 半径 ≈ 最大弧长，留 18% 余量
        while (ctx.measureText(display).width > maxW && display.length > 2) {
            display = display.slice(0, -1);
        }
        if (display !== text) display = display.slice(0, Math.max(1, display.length - 1)) + '…';

        const chars = [...display];
        const total = chars.length;
        if (total === 0) return;

        // 字符均匀分布在扇区弧线上，留 12% 的首尾留白
        const padFrac = total === 1 ? 0 : 0.12;
        const arcStart = startAngle + slice * padFrac;
        const arcEnd = endAngle - slice * padFrac;

        chars.forEach((ch, idx) => {
            // 中间对齐：如果 3 个字符，idx 分别落在 0.25 / 0.5 / 0.75 位置
            const t = total === 1 ? 0.5 : (idx + 0.5) / total;
            const angle = arcStart + (arcEnd - arcStart) * t;
            const tx = cx + Math.cos(angle) * textR;
            const ty = cy + Math.sin(angle) * textR;

            ctx.save();
            ctx.translate(tx, ty);
            // 切向：垂直方向指向圆心（让字头朝转盘外、脚朝圆心）
            let rot = angle + Math.PI / 2;
            // 下方扇区（右下到左下）翻转 180°，避免倒字
            if (rot > Math.PI / 2 && rot < Math.PI * 1.5) rot += Math.PI;
            ctx.rotate(rot);
            ctx.fillText(ch, 0, 0);
            ctx.restore();
        });
    }

    calcFontSize(n) {
        if (n <= 4) return 18;
        if (n <= 6) return 15;
        if (n <= 8) return 13;
        if (n <= 10) return 11;
        return 10;
    }

    // --- 旋转 ---
    spin() {
        if (this.isSpinning || this.options.length < 2) return;

        this.isSpinning = true;
        const btn = document.getElementById('spinButton');
        const center = document.getElementById('spinCenterBtn');
        btn.disabled = true;
        btn.classList.add('spinning');
        btn.querySelector('.spin-text').textContent = '转动中...';
        if (center) center.disabled = true;

        const spins = 3 + Math.floor(Math.random() * 6);
        const offset = Math.random() * 360;
        const total = spins * 360 + offset;
        this.currentRotation += total;

        this.canvas.style.transition = `transform ${this.spinDuration}s cubic-bezier(0.17, 0.67, 0.12, 0.99)`;
        this.canvas.style.transform = `rotate(${this.currentRotation}deg)`;

        sound.spinStart();

        setTimeout(() => this.onComplete(), this.spinDuration * 1000 + 120);
    }

    onComplete() {
        const norm = this.currentRotation % 360;
        const slice = 360 / this.options.length;
        const pointerAngle = 360 - norm;
        const idx = Math.floor(pointerAngle / slice) % this.options.length;
        const result = this.options[idx];

        // 历史
        if (document.getElementById('historyToggle')?.checked !== false) {
            historyStore.push(result);
            renderHistory();
        }

        // 撒花
        if (confetti && confetti.enabled) confetti.burst(150);

        // 弹窗 + 音效
        this.showResult(result);
        sound.win();

        // 按钮复位
        const btn = document.getElementById('spinButton');
        const center = document.getElementById('spinCenterBtn');
        btn.classList.remove('spinning');
        btn.querySelector('.spin-text').textContent = '再转一次';
        this.isSpinning = false;
        this.updateSpinState();
    }

    showResult(result) {
        document.getElementById('resultText').textContent = result;
        document.getElementById('resultModal').classList.add('show');
    }

    closeModal() {
        document.getElementById('resultModal').classList.remove('show');
    }

    // --- 推荐 ---
    initRecommend() {
        const searchInput = document.getElementById('searchInput');
        document.getElementById('searchBtn').addEventListener('click', () => this.performSearch());
        searchInput.addEventListener('keypress', e => { if (e.key === 'Enter') this.performSearch(); });

        document.querySelectorAll('.tag-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const cat = btn.dataset.category;
                this.loadCategory(cat);
                sound.click();
            });
        });

        document.getElementById('importAllBtn').addEventListener('click', () => this.importAll());
        document.getElementById('clearRecommendBtn').addEventListener('click', () => this.clearRec());
    }

    performSearch() {
        const input = document.getElementById('searchInput');
        const kw = input.value.trim();
        if (!kw) { showRecPlaceholder('请输入搜索关键词'); return; }
        const container = document.getElementById('recommendResults');
        container.innerHTML = '<p class="search-loading">正在搜索中</p>';
        setTimeout(() => {
            const results = this.searchKw(kw);
            this.displayResults(results);
        }, 400);
        sound.click();
    }

    searchKw(kw) {
        const results = new Set();
        if (recommendationDatabase[kw]) recommendationDatabase[kw].forEach(x => results.add(x));
        for (const [k, v] of Object.entries(keywordMappings)) {
            if (kw.includes(k) && recommendationDatabase[v]) {
                recommendationDatabase[v].forEach(x => results.add(x));
            }
        }
        for (const [, items] of Object.entries(recommendationDatabase)) {
            items.forEach(it => { if (it.toLowerCase().includes(kw.toLowerCase())) results.add(it); });
        }
        if (results.size === 0) {
            [`${kw}方案A`, `${kw}方案B`, `${kw}方案C`, `${kw}备选1`, `${kw}备选2`].forEach(x => results.add(x));
        }
        return [...results].slice(0, 12);
    }

    loadCategory(cat) {
        const container = document.getElementById('recommendResults');
        container.innerHTML = '<p class="search-loading">加载中</p>';
        setTimeout(() => {
            if (recommendationDatabase[cat]) {
                this.displayResults(recommendationDatabase[cat].slice(0, 12));
            } else {
                showRecPlaceholder('未找到该分类');
            }
        }, 300);
        document.getElementById('searchInput').value = cat;
    }

    displayResults(results) {
        const container = document.getElementById('recommendResults');
        const batch = document.getElementById('batchActions');
        if (!results || results.length === 0) { showNoResults(); return; }
        container.innerHTML = '';
        results.forEach((item, i) => {
            const added = this.options.includes(item);
            const row = document.createElement('div');
            row.className = 'recommend-item';
            row.style.animationDelay = `${i * 0.04}s`;
            row.innerHTML = `
                <span class="recommend-item-text">${escapeHtml(item)}</span>
                <button class="recommend-item-add ${added ? 'added' : ''}">${added ? '已添加' : '+ 添加'}</button>
            `;
            const btn = row.querySelector('.recommend-item-add');
            btn.addEventListener('click', () => {
                if (added || this.isSpinning) return;
                if (this.options.length >= this.maxOptions) { showToast(`最多 ${this.maxOptions} 个选项`); return; }
                this.addOption(item);
                btn.textContent = '已添加';
                btn.classList.add('added');
                sound.pop();
            });
            container.appendChild(row);
        });
        batch.style.display = 'flex';
    }

    importAll() {
        const rows = document.querySelectorAll('.recommend-item');
        let count = 0;
        rows.forEach(row => {
            const text = row.querySelector('.recommend-item-text').textContent;
            const btn = row.querySelector('.recommend-item-add');
            if (!this.options.includes(text) && this.options.length < this.maxOptions && !this.isSpinning) {
                this.addOption(text);
                btn.textContent = '已添加';
                btn.classList.add('added');
                count++;
            }
        });
        showToast(count > 0 ? `✅ 导入 ${count} 个选项` : '没有新选项可导入');
        sound.pop();
    }

    clearRec() {
        document.getElementById('recommendResults').innerHTML =
            '<p class="placeholder-text">点热门标签或输入关键词</p>';
        document.getElementById('batchActions').style.display = 'none';
        document.getElementById('searchInput').value = '';
        sound.pop();
    }
}

function showRecPlaceholder(t) {
    document.getElementById('recommendResults').innerHTML = `<p class="placeholder-text">${t}</p>`;
    document.getElementById('batchActions').style.display = 'none';
}
function showNoResults() { showRecPlaceholder('未找到，请换个关键词试试'); }

// ==================== 工具函数 ====================

/** 给 range 滑块的轨道填上从左到右的霓虹渐变，表示当前进度 */
function updateRangeFill(el) {
    if (!el) return;
    const min = parseFloat(el.min) || 0;
    const max = parseFloat(el.max) || 100;
    const val = parseFloat(el.value);
    const pct = Math.max(0, Math.min(100, ((val - min) / (max - min)) * 100));
    el.style.background =
        `linear-gradient(90deg, #ff2e93 0%, #b400ff ${pct}%, rgba(255,255,255,0.08) ${pct}%, rgba(255,255,255,0.08) 100%)`;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = String(text);
    return div.innerHTML;
}

function hexLuminance(hex) {
    const h = hex.replace('#', '');
    const r = parseInt(h.substr(0, 2), 16) / 255;
    const g = parseInt(h.substr(2, 2), 16) / 255;
    const b = parseInt(h.substr(4, 2), 16) / 255;
    return 0.299 * r + 0.587 * g + 0.114 * b;
}

// Toast 通知
let toastTimer = null;
function showToast(msg) {
    let toast = document.querySelector('.toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.style.cssText = `
            position: fixed; top: 20px; right: 50%; transform: translateX(50%);
            background: linear-gradient(135deg, var(--accent-pink), var(--accent-purple));
            color: white; padding: 12px 22px; border-radius: 50px;
            z-index: 2000; font-weight: 700; font-size: 14px; letter-spacing: 1px;
            box-shadow: 0 2px 8px rgba(255, 46, 147, 0.35); animation: fadeIn 0.3s ease;
            pointer-events: none;
        `;
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.style.opacity = '0'; }, 2200);
}

// ==================== 数字范围弹窗 ====================

function openRangeModal() {
    const modal = document.getElementById('rangeModal');
    if (!modal) { showToast('弹窗 DOM 未找到'); return; }
    modal.hidden = false;
    document.getElementById('rangeMin').value = '1';
    document.getElementById('rangeMax').value = '100';
    setTimeout(() => document.getElementById('rangeMin').focus(), 100);
}

function closeRangeModal() {
    const modal = document.getElementById('rangeModal');
    if (modal) modal.hidden = true;
}

function applyNumberRange() {
    const minInput = document.getElementById('rangeMin');
    const maxInput = document.getElementById('rangeMax');
    const min = parseInt(minInput.value, 10);
    const max = parseInt(maxInput.value, 10);

    if (Number.isNaN(min) || Number.isNaN(max)) {
        showToast('请输入有效数字'); return;
    }
    if (min >= max) {
        showToast('最小值必须小于最大值'); return;
    }
    const count = max - min + 1;
    if (count > 300) {
        showToast(`范围太大（${count}项），会拥挤。试试 ≤300？`); return;
    }
    if (count < 2) {
        showToast('至少需要 2 个数字'); return;
    }

    const wheel = window.wheel;
    if (!wheel) { showToast('转盘未就绪'); return; }

    wheel.options = Array.from({ length: count }, (_, i) => String(min + i));
    wheel.renderOptionsList();
    wheel.updateSpinState();
    wheel.draw();
    closeRangeModal();
    showToast(`已加载 ${min} ~ ${max}（${count} 个数字）`);
}

// ==================== 应用初始化 ====================

document.addEventListener('DOMContentLoaded', () => {
    confetti = new Confetti('confettiCanvas');
    initTheme();

    // banner.js 会给自己注入固定尺寸样式（如 width:579px），
    // 横幅已移进菜单抽屉（index.html 的 bottom-banner div），
    // 这里只清 banner.js 注入的 width 限制，让横幅在抽屉容器里自然流动。
    const fixBanner = () => {
        const b = document.querySelector('.kao-banner') || document.querySelector('.bottom-banner [class*="banner"]') || document.querySelector('[class*="banner"]');
        if (!b) return false;
        // 只清 banner.js 硬写的固定尺寸，不强制位置
        const el = b.classList.contains('kao-banner') ? b : b.closest('.bottom-banner') || b;
        // 如果 banner 被强制 fixed，先撤掉
        const style = el.getAttribute('style') || '';
        const cleaned = style
            .replace(/position\s*:\s*fixed[^;]*/gi, '')
            .replace(/bottom\s*:\s*0[^;]*/gi, '')
            .replace(/z-index\s*:\s*\d+[^;]*/gi, '');
        el.setAttribute('style', cleaned);
        // 子元素清 width 限制
        for (const child of el.children) {
            child.style.width = 'auto';
            child.style.maxWidth = 'none';
        }
        return true;
    };
    if (!fixBanner()) {
        const mo = new MutationObserver(() => { if (fixBanner()) mo.disconnect(); });
        mo.observe(document.body, { childList: true, subtree: true });
        setTimeout(() => mo.disconnect(), 3000);
    }

    // 音效已移除
    document.getElementById('soundToggle')?.classList.add('active');
    sound.toggle(true);
    // 用户第一次交互时激活
    const activateOnFirst = () => {
        sound.ensureCtx();
        document.removeEventListener('click', activateOnFirst);
        document.removeEventListener('keydown', activateOnFirst);
        document.removeEventListener('touchstart', activateOnFirst);
    };
    document.addEventListener('click', activateOnFirst);
    document.addEventListener('keydown', activateOnFirst);
    document.addEventListener('touchstart', activateOnFirst);

    // 创建转盘（挂 window 让外部工具函数能访问）
    const wheel = window.wheel = new Wheel();

    // ==================== 菜单抽屉系统 ====================
    const menuBtn = document.getElementById('menuBtn');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const drawerPanel = document.getElementById('drawerPanel');
    const drawerClose = document.getElementById('drawerClose');
    const presetList = document.getElementById('presetList');
    const presetEmpty = document.getElementById('presetEmpty');
    const presetCount = document.getElementById('presetCount');
    const saveCurrentBtn = document.getElementById('saveCurrentBtn');

    // 打开抽屉
    const openDrawer = () => {
        drawerPanel.hidden = false;
        requestAnimationFrame(() => {
            drawerOverlay.classList.add('open');
            drawerPanel.classList.add('open');
            drawerPanel.setAttribute('aria-hidden', 'false');
            menuBtn.classList.add('active');
            menuBtn.setAttribute('aria-expanded', 'true');
        });
        document.body.style.overflow = 'hidden';
        renderPresets();
    };

    // 关闭抽屉
    const closeDrawer = () => {
        drawerOverlay.classList.remove('open');
        drawerPanel.classList.remove('open');
        menuBtn.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
        drawerPanel.setAttribute('aria-hidden', 'true');
        setTimeout(() => { drawerPanel.hidden = true; drawerOverlay.classList.remove('open'); }, 350);
        document.body.style.overflow = '';
    };

    // ESC 关闭
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && drawerPanel.classList.contains('open')) closeDrawer();
    });

    menuBtn?.addEventListener('click', () => {
        if (drawerPanel.classList.contains('open')) closeDrawer();
        else openDrawer();
    });
    drawerOverlay?.addEventListener('click', closeDrawer);
    drawerClose?.addEventListener('click', closeDrawer);

    // 渲染历史转盘卡片列表
    function renderPresets() {
        const list = presetStore.load();
        presetCount.textContent = `${list.length} / ${presetStore.MAX}`;
        if (list.length === 0) {
            presetEmpty.style.display = 'block';
            presetList.innerHTML = '';
            presetList.appendChild(presetEmpty);
            return;
        }
        presetEmpty.style.display = 'none';
        presetList.innerHTML = list.map(snapshot => {
            const colors = colorSchemes[snapshot.config.colorScheme] || colorSchemes.default;
            const firstColor = colors[0];
            const cfg = snapshot.config;
            const time = new Date(snapshot.createdAt);
            const mmd = `${time.getMonth() + 1}/${time.getDate()}`;
            const hh = String(time.getHours()).padStart(2, '0');
            const mm = String(time.getMinutes()).padStart(2, '0');
            return `
                <div class="preset-card" data-id="${snapshot.id}" role="button" tabindex="0">
                    <div class="preset-color" style="background: linear-gradient(135deg, ${colors[0]} 0%, ${colors[Math.min(2, colors.length - 1)]} 100%);"></div>
                    <div class="preset-info">
                        <div class="preset-name">${escapeHtml(snapshot.name)}</div>
                        <div class="preset-meta">${cfg.options.length} 项 · ${cfg.colorScheme} · ${mmd} ${hh}:${mm}</div>
                    </div>
                    <button class="preset-delete" data-del="${snapshot.id}" title="删除" aria-label="删除">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                    </button>
                </div>
            `;
        }).join('');

        // 卡片点击 → 恢复 preset
        presetList.querySelectorAll('.preset-card').forEach(card => {
            card.addEventListener('click', e => {
                if (e.target.closest('.preset-delete')) return;  // 删除按钮单独处理
                const id = card.dataset.id;
                const snap = presetStore.load().find(s => s.id === id);
                if (!snap) return;
                wheel.applyPreset(snap);
                closeDrawer();
            });
            card.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); }
            });
        });
        // 删除按钮
        presetList.querySelectorAll('.preset-delete').forEach(btn => {
            btn.addEventListener('click', e => {
                e.stopPropagation();
                const id = btn.dataset.del;
                const snap = presetStore.load().find(s => s.id === id);
                const name = snap ? snap.name : '该项';
                if (confirm(`删除历史转盘「${name}」？`)) {
                    presetStore.remove(id);
                    sound.click();
                    showToast('已删除');
                    renderPresets();
                }
            });
        });
    }

    // 保存当前转盘
    saveCurrentBtn?.addEventListener('click', () => {
        const options = wheel.options;
        if (options.length < 2) { showToast('至少需要 2 个选项才能保存'); return; }
        // 如果已达上限，提示最旧的会被挤掉
        const curCount = presetStore.load().length;
        if (curCount >= presetStore.MAX) {
            if (!confirm(`历史转盘最多保存 ${presetStore.MAX} 条，保存后最旧的将被覆盖。继续？`)) return;
        }
        const defaultName = options[0] + (options.length > 1 ? ` 等${options.length}项` : '');
        const name = prompt('给这个转盘起个名字（可留空自动命名）：', defaultName) || defaultName;
        wheel.saveCurrentAsPreset(name);
        showToast('已保存 ✓');
        renderPresets();
    });

    // 快捷链接占位提示（用户未填 GitHub URL 时）
    const githubLink = document.getElementById('githubLink');
    const feedbackLink = document.getElementById('feedbackLink');
    [githubLink, feedbackLink].forEach(link => {
        if (link && link.getAttribute('href') === '#') {
            link.addEventListener('click', e => {
                e.preventDefault();
                showToast('即将开放，敬请期待');
            });
        }
    });

    // 历史
    renderHistory();

    // 从 URL 参数加载模板
    const tpl = new URLSearchParams(window.location.search).get('template');
    if (tpl && templates[tpl]) wheel.loadTemplate(tpl);

    // 响应窗口大小变化
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => { wheel.setupCanvas(); wheel.draw(); }, 200);
    });

    console.log('🎡 幸运转盘 Carnival Wheel 已初始化');
});
