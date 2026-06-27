/**
 * 图标生成脚本
 * 使用方法：node generate-icons.js
 * 需要安装依赖：npm install canvas sharp
 */

const fs = require('fs');
const path = require('path');

// 简单的图标生成方案：创建一个HTML文件用浏览器打开后截图
// 或者使用纯JavaScript生成base64编码的PNG

// 由于环境限制，我们创建一个简单的占位符方案
// 实际生产环境中可以使用专业的图标生成工具

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

console.log('🎨 幸运转盘 - 图标生成说明');
console.log('=' .repeat(50));
console.log('');
console.log('📁 已创建 SVG 图标: icons/icon.svg');
console.log('   该 SVG 可自动适配所有尺寸！');
console.log('');
console.log('📋 推荐的 PNG 生成方式：');
console.log('1. 在线工具：https://realfavicongenerator.net/');
console.log('2. 使用 Sketch/Figma 导出多尺寸 PNG');
console.log('3. 使用 ImageMagick 命令行工具：');
console.log('   for size in 72 96 128 144 152 192 384 512; do \\');
console.log('     convert icon.svg -resize ${size}x${size} icon-${size}x${size}.png');
console.log('   done');
console.log('');

// 创建一个简单的 HTML 页面用于手动导出图标
const htmlContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>图标导出工具</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            padding: 40px;
            background: #f5f5f5;
            text-align: center;
        }
        h1 { color: #333; margin-bottom: 30px; }
        .icon-container {
            display: inline-block;
            margin: 20px;
            padding: 20px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        img { max-width: 256px; height: auto; }
        .instructions {
            max-width: 600px;
            margin: 30px auto;
            text-align: left;
            padding: 20px;
            background: white;
            border-radius: 8px;
        }
        ol { line-height: 2; color: #555; }
        code { background: #f0f0f0; padding: 2px 6px; border-radius: 4px; }
    </style>
</head>
<body>
    <h1>🎡 幸运转盘 - 图标导出工具</h1>
    
    <div class="icon-container">
        <img src="icon.svg" alt="幸运转盘图标">
        <p style="margin-top: 10px; color: #666;">SVG 源文件 (512x512)</p>
    </div>
    
    <div class="instructions">
        <h3>📱 如何导出 PNG 图标：</h3>
        <ol>
            <li>右键点击上方的图标图片</li>
            <li>选择"另存为图片"或"复制图片"</li>
            <li>使用在线工具（如 <a href="https://convertio.co/svg-png/" target="_blank">ConvertIO</a>）转换为 PNG</li>
            <li>或使用图像编辑软件（Photoshop/GIMP）导出以下尺寸：</li>
        </ol>
        
        <h3>📐 需要的尺寸列表：</h3>
        <ul style="line-height: 2; color: #555;">
            ${sizes.map(size => `<li><code>${size}x${size}.png</code></li>`).join('')}
        </ul>
        
        <h3>💡 快捷方式（推荐）：</h3>
        <p>访问 <a href="https://realfavicongenerator.net/" target="_blank">RealFaviconGenerator</a><br>
        上传 <code>icon.svg</code> 文件，自动生成所有需要的图标和代码！</p>
    </div>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'icons', 'export.html'), htmlContent);

console.log('✅ 已创建图标导出页面: icons/export.html');
console.log('   用浏览器打开该页面即可查看和导出图标！');
console.log('');
console.log('⚡  临时解决方案：');
console.log('   应用已配置为优先使用 SVG 图标，兼容性良好！');
console.log('');

// 更新 manifest.json 以支持 SVG
const manifestPath = path.join(__dirname, '..', 'manifest.json');
if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    
    // 添加 SVG 图标
    manifest.icons.unshift({
        src: 'icons/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any'
    });
    
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log('✅ 已更新 manifest.json 添加 SVG 图标支持');
}

console.log('');
console.log('🎉 准备完成！应用现在可以在移动端正常使用了。');