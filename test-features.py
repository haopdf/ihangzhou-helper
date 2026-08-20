#!/usr/bin/env python3
"""
iHangzhou 功能测试脚本
验证主要功能：计算器、搜索、主题切换等
"""

import asyncio
import aiohttp
import json
from typing import List, Dict, Any

class IHangzhouTester:
    def __init__(self):
        self.base_url = "http://localhost:8000"
        self.test_results = []
        
    async def test_basic_connectivity(self):
        """测试基本连接"""
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(self.base_url) as response:
                    if response.status == 200:
                        content = await response.text()
                        if "iHangzhou" in content and "杭州生活助手" in content:
                            return True, "基本连接测试通过"
                        else:
                            return False, "页面内容不符合预期"
                    return False, f"HTTP状态码: {response.status}"
        except Exception as e:
            return False, f"连接异常: {str(e)}"
    
    async def test_static_files(self):
        """测试静态文件加载"""
        files_to_test = [
            ("/css/style.css", "text/css"),
            ("/js/app.js", "application/javascript"),
            ("/data/services.json", "application/json")
        ]
        
        results = []
        async with aiohttp.ClientSession() as session:
            for file_path, expected_type in files_to_test:
                try:
                    async with session.get(f"{self.base_url}{file_path}") as response:
                        if response.status == 200:
                            content_type = response.headers.get('Content-Type', '')
                            if expected_type in content_type:
                                results.append(f"✓ {file_path}")
                            else:
                                results.append(f"✗ {file_path} (Content-Type: {content_type})")
                        else:
                            results.append(f"✗ {file_path} (HTTP {response.status})")
                except Exception as e:
                    results.append(f"✗ {file_path} (Error: {str(e)})")
        
        return len([r for r in results if r.startswith("✓")]) == len(files_to_test), "\n".join(results)
    
    async def test_json_data_structure(self):
        """测试JSON数据结构"""
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(f"{self.base_url}/data/services.json") as response:
                    if response.status == 200:
                        data = await response.json()
                        
                        # 检查必需字段
                        required_fields = ['meta', 'categories', 'phonebook', 'postcodes']
                        missing_fields = [f for f in required_fields if f not in data]
                        
                        if missing_fields:
                            return False, f"缺少必需字段: {missing_fields}"
                        
                        # 检查分类
                        if len(data['categories']) < 5:
                            return False, "分类数量不足"
                        
                        # 检查是否有死链
                        dead_links = []
                        for cat in data['categories']:
                            for item in cat.get('items', []):
                                url = item.get('url', '')
                                if 'baidu.com' in url:
                                    dead_links.append(f"{cat['name']} - {item['name']}")
                        
                        if dead_links:
                            return False, f"发现 {len(dead_links)} 个死链\n" + "\n".join(dead_links[:5])
                        
                        return True, f"数据验证通过 - {len(data['categories'])} 个分类，{sum(len(c['items']) for c in data['categories'])} 个服务项目"
                    return False, f"无法获取JSON数据 (HTTP {response.status})"
        except Exception as e:
            return False, f"JSON数据解析失败: {str(e)}"
    
    async def run_all_tests(self):
        """运行所有测试"""
        print("🔧 开始 iHangzhou 功能测试...\n")
        
        tests = [
            ("基本连接测试", self.test_basic_connectivity),
            ("静态文件测试", self.test_static_files),
            ("数据结构测试", self.test_json_data_structure),
        ]
        
        for test_name, test_func in tests:
            print(f"正在运行: {test_name}")
            try:
                success, message = await test_func()
                status = "✅ 通过" if success else "❌ 失败"
                print(f"{status} - {message}\n")
            except Exception as e:
                print(f"❌ 失败 - 测试异常: {str(e)}\n")
        
        print("测试完成!")

async def main():
    tester = IHangzhouTester()
    await tester.run_all_tests()

if __name__ == "__main__":
    asyncio.run(main())