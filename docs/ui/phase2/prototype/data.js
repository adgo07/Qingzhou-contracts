/* Presentation-only fixtures. No authoritative rule, profile, threshold or calculator. */
window.QZ_DEMO = {
  products: {
    ec: {name:'能耗限额对标',short:'ECQuota',create:'新建对标',records:'对标记录',library:'折标系数库',verb:'对标',standard:'GB 29446—2019',title:'选煤电力消耗限额',intro:'围绕标准开展能耗数据检查与对标。',excel:false,lib:false,unit:'kWh/t',value:'7.50'},
    eq: {name:'设备能效分析',short:'EquipEffi',create:'新建分析',records:'分析记录',library:null,verb:'分析',standard:'GB 19762—2025',title:'离心泵能效限定值及能效等级',intro:'从设备参数到能效结果，保持清楚的分析路径。',excel:true,lib:false,unit:'%',value:'82.0'},
    ghg: {name:'温室气体排放核算',short:'GHGTOOL',create:'新建核算',records:'核算记录',library:'参数与因子库',verb:'核算',standard:'GB/T 32151.34—2024',title:'温室气体排放核算参考标准',intro:'组织活动数据与排放源，查看核算结构和结果。',excel:true,lib:true,unit:'tCO₂e',value:'128.0'}
  },
  makeStandards(product,count=36) {
    const p=this.products[product];
    return Array.from({length:count},(_,i)=>({id:i,code:i===0?p.standard:`DEMO-${String(i).padStart(4,'0')}`,name:i===0?p.title:`演示标准 ${i} · 工业能源与设备应用示例${i%7===0?'（超长名称用于窄窗口与换行验证）':''}`,status:i%6===0?'现行':i%6===1?'即将实施':i%6===2?'已废止':'现行',date:'2026-10-01（演示）',support:i===0?'参考标准（演示）':'仅演示目录',scope:'仅用于交互结构验证；本原型不复述或解释正式标准条款。'}));
  },
  makeRecords(product,count=126) {
    const p=this.products[product];
    return Array.from({length:count},(_,i)=>({id:`${product}-${i+1}`,name:`演示${p.verb} · ${i%9===0?'青舟工业示范企业长名称与多生产线验证项目':`示例企业 ${i+1}`}`,standard:p.standard,date:`2026-10-${String(1+i%8).padStart(2,'0')} 09:30`,status:i%4===0?'演示待补充':'演示完成',value:p.value,unit:p.unit,input:[['业务对象',`示例企业 ${i+1}`],['期间','2026 年（演示）'],['输入数据','演示快照，非真实业务输入']]}));
  },
  makeSources(count=2) {
    return Array.from({length:count},(_,i)=>({id:`source-${i+1}`,type:i%3===0?'燃料燃烧':i%3===1?'购入电力':'生产过程',name:`演示排放源 ${i+1}`,amount:String(100+i*20),unit:i%3===1?'MWh':'t',note:'仅为长表单与动态输入的演示数据'}));
  },
  parameters: Array.from({length:32},(_,i)=>({id:i,name:i%2?'电力排放因子示例':'燃料参数示例',standard:'演示标准关联',value:'示意值 — 非正式因子',unit:i%2?'tCO₂e/MWh':'GJ/t',note:'仅验证参数浏览；不作任何核算的数据源。'}))
};
