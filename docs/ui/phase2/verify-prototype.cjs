/* 仅验证离线设计原型；不作为正式业务或标准算法合格性证据。 */
const fs=require('fs');
const path=require('path');
const {pathToFileURL}=require('url');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
(async()=>{
const root=__dirname,output=path.join(root,'evidence');fs.mkdirSync(output,{recursive:true});
const browser=await chromium.launch({channel:process.env.QZ_BROWSER_CHANNEL||'msedge',headless:true});
const context=await browser.newContext({viewport:{width:1440,height:900},offline:true});
const page=await context.newPage(); const errors=[],network=[],failures=[]; let checks=0;
page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(/^https?:/.test(r.url()))network.push(r.url());});
// 普通断言累计失败，尽量在一次运行中报告所有可执行的检查。
const check=(value,message)=>{
  checks++;
  if(!value){
    failures.push({index:checks,message});
    console.error(`[检查未通过 ${checks}] ${message}`);
  }
};
const click=async action=>page.locator(`[data-action="${action}"]`).first().click();
const nav=async route=>page.locator(`[data-action="navigate"][data-page="${route}"]`).first().click();
const scenario=async value=>page.locator('#scenario').selectOption(value);
const product=async value=>page.locator('#product').selectOption(value);
await page.goto(pathToFileURL(path.join(root,'prototype/index.html')).href);await page.waitForSelector('.entry-card');
check(await page.locator('.sidebar').count()===0,'首页不显示左侧导航栏');
check((await page.locator('.entry-card').evaluateAll(e=>e.map(x=>x.dataset.page))).slice(0,2).join(',')==='standards,create','首页标准库位于新建业务之前');
check(await page.locator('.entry-card[data-page="excel"]').isDisabled(),'ECQuota 表格导入未开放');
check((await page.locator('.entry-card').evaluateAll(e=>e.map(x=>x.dataset.page))).slice(0,4).join(',')==='standards,create,excel,records','首页功能顺序正确');
check((await page.locator('.entry-card').allTextContents()).some(v=>v.includes('表格导入')),'首页表格导入中文名称');
check(await page.locator('.entry-card[data-page="library"]').isDisabled(),'能耗限额软件的折标系数库处于禁用状态');
check(await page.locator('img.brand-logo').first().evaluate(e=>e.naturalWidth>100),'青舟 LOGO 可离线加载');
await click('home-settings');check(await page.locator('#settings-dialog').isVisible(),'首页设置入口独立且可打开');await page.keyboard.press('Escape');
await page.evaluate(()=>document.getElementById('toast').hidden=true);await page.screenshot({path:path.join(output,'home-desktop.png'),fullPage:true});
await nav('standards');
check((await page.locator('.data-table th').allTextContents()).join('|')==='标准编号|标准名称|标准状态|实施日期|软件支持','标准库五列正确');
check(await page.locator('#support').count()===0,'标准库没有软件支持筛选');
await page.locator('#search').fill('选煤');
check(await page.locator('tbody tr').count()===1,'适用对象可搜索');
await click('reset-filters');
await page.locator('#status').selectOption('已废止');
check((await page.locator('tbody tr').count())>0,'标准状态筛选');
await click('reset-filters');
await page.locator('#search').fill('not-present');
check(await page.locator('.empty-state').count()===1,'无匹配提示');
await click('reset-filters');
await page.locator('tbody tr:first-child td:nth-child(1) button').click();
check(await page.locator('.standard-detail-section').count()===3,'标准编号打开单页三分区');
check((await page.locator('.standard-detail-section h2').allTextContents()).join('|')==='基本信息|适用范围|标准要求','标准详情分区正确');
check(await page.getByRole('tab').count()===0,'标准详情没有页签');
check(!(await page.locator('.standard-detail-stack').innerText()).includes('软件支持范围'),'无软件支持范围');
await page.evaluate(()=>document.getElementById('toast').hidden=true);
await page.screenshot({path:path.join(output,'standard-detail-1440.png'),fullPage:true});
await click('original');check((await page.locator('#toast').textContent()).includes('未附正式标准原文'),'查看原文提示');
await click('back-standard');
await page.locator('tbody tr:first-child td:nth-child(2) button').click();
check(await page.locator('.standard-detail-section').count()===3,'标准名称打开同一详情');
await click('back-standard');
await nav('records');await page.locator('#search').fill('ec-126');check(await page.locator('tbody tr').count()===1,'非最近记录也可以被搜索并访问');
await click('open-record');check(await page.getByRole('tab').count()===2,'记录详情严格保留两个页签');
check(await page.locator('#main button').filter({hasText:/重新开展|审计详情|报告导出/}).count()===0,'记录详情未出现禁止的重新开展业务、审计或报告导出操作');
await click('back-record');await scenario('long');check((await page.locator('.pagination').textContent()).includes('420'),'长列表全部 420 条记录可访问');await click('next');check((await page.locator('.pagination').textContent()).includes('2 / 35'),'长列表分页可以前进');
await nav('home');check(await page.locator('.sidebar').count()===0,'从业务侧栏返回无侧栏首页');
await click('preview-excel');check(await page.locator('.excel-region').count()===4,'能耗限额软件的表格导入设计预览包含四个区域');check(await page.locator('.excel-region button:not(:disabled)').count()===0,'设计预览不会开放未实现的表格导入能力');
await product('eq');check(await page.locator('[data-page="library"]').count()===0,'设备能效软件不增加独立参数库');
await nav('create');check(await page.locator('.form-section').count()===5,'新建业务页包含五类功能分区');
await scenario('error');await click('calculate');check(await page.locator('#checks [role="alert"]').count()===1,'错误输入产生页面内检查提示');
await page.locator('#field-name').fill('演示设备');await click('calculate');check((await page.locator('#section-4').textContent()).includes('不可用于正式判定'),'演示结果明确标注不得用于正式判定');
check(await page.locator('[data-action="save-demo"], [data-action="save-workspace"]').count()===0,'设备能效分析未新增草稿或额外保存动作');
await page.locator('#field-flow').fill('121');check(await page.locator('#section-4 .metric-value').count()===0,'输入修改后旧演示结果失效');
await nav('records');check((await page.locator('.pagination').textContent()).includes('127'),'设备能效演示结果无需额外保存即可形成演示记录');
await nav('excel');check(await page.locator('.page-title').textContent()==='表格导入','EquipEffi 表格导入中文标题');check(await page.locator('.excel-region').count()===4,'设备能效软件表格导入包含四个区域');
await scenario('error');await click('load-excel');await click('check-excel');check(await page.locator('[data-action="batch"]').isDisabled(),'演示检查存在错误时禁用批量操作');
await scenario('normal');await click('load-excel');await click('check-excel');await click('batch');check(await page.locator('[data-action="export-csv"]').count()===1,'模拟批量操作后展示演示结果入口');
const download=page.waitForEvent('download');await click('export-csv');check((await download).suggestedFilename()==='仅演示结果.csv','下载结果明确标识为演示 CSV 而非正式 XLSX');
await product('ghg');await nav('excel');check(await page.locator('.page-title').textContent()==='表格导入','GHGTOOL 表格导入中文标题');await click('load-excel');await click('check-excel');check(await page.locator('[data-action="batch"], [data-action="save-demo"]').count()===0,'碳核算表格预览不提供批量计算或正式记录操作');
await nav('records');check((await page.locator('.pagination').textContent()).includes('126'),'碳核算表格预览不会新增正式记录');
await nav('library');await click('parameter');check(await page.getByRole('dialog').isVisible(),'参数详情对话框可以打开');check((await page.getByRole('dialog').innerText()).includes('不作为正式核算来源'),'参数详情显示只读与非正式来源说明');await click('close-dialog');await page.locator('#param-search').fill('missing');check(await page.locator('.empty-state').count()===1,'参数搜索无匹配时显示空状态');
await nav('create');const initial=await page.locator('.source-card').count();await click('add-source');check(await page.locator('.source-card').count()===initial+1,'可以添加动态排放源');await page.locator('[data-action="remove-source"]').last().click();check(await page.locator('.source-card').count()===initial,'可以移除动态排放源');
await page.locator('#source-1-type').selectOption('购入热力');check(await page.locator('#source-1-amount').inputValue()==='100','排放源类别切换暂保留已输入活动量（推荐方案）');
await click('save-workspace');check(await page.locator('[data-action="open-workspace"]').count()===1,'演示工作区与正式记录保持分离');
await scenario('long');check(await page.locator('.source-card').count()===18,'长表单场景显示 18 个排放源');
await page.evaluate(()=>document.getElementById('toast').hidden=true);await page.screenshot({path:path.join(output,'ghg-long-form.png'),fullPage:true});
await nav('settings');check((await page.locator('#main').textContent()).includes('仍为占位'),'设置页明确不冒充已实现的正式功能');
for(const [width,height] of [[1440,900],[1024,768],[768,1024],[390,844]]){
 await page.setViewportSize({width,height});await product('ghg');await nav('standards');await scenario('long');
 check(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1),`窗口宽度 ${width}：页面没有整体横向溢出`);
 check(await page.locator('.table-wrap').evaluate(e=>e.scrollWidth>=e.clientWidth),`窗口宽度 ${width}：表格容器可局部滚动`);
 await page.evaluate(()=>document.getElementById('toast').hidden=true);await page.screenshot({path:path.join(output,`standards-${width}.png`),fullPage:true});
 if(width===390){
  await page.locator('tbody tr:first-child td:nth-child(1) button').click();
  await page.screenshot({path:path.join(output,'standard-detail-390.png'),fullPage:true});
  await click('back-standard');
 }
 await nav('create');await scenario('long');check(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1),`窗口宽度 ${width}：长表单没有整体横向溢出`);
 await page.evaluate(()=>document.getElementById('toast').hidden=true);await page.screenshot({path:path.join(output,`form-${width}.png`),fullPage:width===390});
 await nav('home');check(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1),`窗口宽度 ${width}：首页没有整体横向溢出`);
 if(width===390)await page.evaluate(()=>document.getElementById('toast').hidden=true);await page.screenshot({path:path.join(output,'home-mobile.png'),fullPage:true});
}
check(errors.length===0,`JavaScript 执行错误：${errors.join(';')}`);check(network.length===0,'离线原型未发起 HTTP(S) 网络请求');
const result={checks,passed:checks-failures.length,failed:failures.length,failures,status:failures.length?'FAIL':'PASS',browser:'Edge Chromium',offline:true,viewports:[1440,1024,768,390],javascriptErrors:errors,networkRequests:network};
fs.writeFileSync(path.join(output,'browser-checks.json'),JSON.stringify(result,null,2)+'\n');console.log(`浏览器复验完成：总计 ${result.checks} 项，通过 ${result.passed} 项，失败 ${result.failed} 项；状态 ${result.status}`);
console.log(JSON.stringify(result));await browser.close();
if(result.status!=='PASS')process.exitCode=1;
})().catch(e=>{
  const details=e&&e.stack?e.stack:String(e);
  console.error('浏览器复验被运行异常中断：',details);
  const output=path.join(__dirname,'evidence');
  fs.mkdirSync(output,{recursive:true});
  fs.writeFileSync(path.join(output,'browser-checks.json'),JSON.stringify({
    status:'ERROR',interrupted:true,error:details,
    note:'浏览器动作异常导致执行中断；请修复异常并重新运行完整验证。'
  },null,2)+'\n');
  process.exitCode=1;
});
