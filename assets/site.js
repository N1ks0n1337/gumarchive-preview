'use strict';
const objects = JSON.parse(document.getElementById('catalogData').textContent);
const sourceNames = JSON.parse(document.getElementById('sourcesData').textContent);
const sourceEn = JSON.parse(document.getElementById('sourcesEnData').textContent);
const byId = id => document.getElementById(id);
const esc = t => String(t??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
const UI = {
 en: {
  eyebrow:'FAMILY ARCHIVE · CHELYABINSK & TRAVELS',heroTitle:'FROM FLAVOR<br>TO IMAGE',lead:'Vintage chewing gum wrappers, comics, vehicle inserts and little printed stories: a history of graphic design preserved in one family album.',heroNote:'Research catalog · October 24, 2026 · dates labeled by confidence',brand:'ARCHIVE / 01',navResearch:'Research',navPages:'Album pages',navCatalog:'Catalog',navSources:'Sources',introSmall:'INTRODUCTION',introTitle:'When the wrapper outlived the product',
  intro:'The gum disappeared, but its wrappers remained. This collection brings together commercial branding, serial inserts and the physical traces of family preservation. American packaging, Soviet Olympic graphic design, East German comics, Turkish car cards and Yugoslav animated characters coexist in one album.',statPages:'album-page photographs',statItems:'provisional catalog records*',statSources:'bibliography references',statYear:'documented Otto & Alwin series',statFoot:'* The figure is not the number of unique physical specimens.',attributionHead:'Attribution rule.',attribution:'A brand’s launch date is not the date of the actual wrapper. Where no dated archival match exists, a range and confidence level are stated. Resemblance to Bauhaus, Memphis or Pop Art is a formal comparison, not proof of direct influence.',
  readResearch:'Read full research (Russian)',downloadResearch:'Research PDF (Russian)',downloadWorkbook:'Download bilingual catalog (Excel)',designSmall:'DESIGN HISTORY',designTitle:'Six visual languages in a single album',pagesSmall:'PRESERVING THE ORIGINAL CONTEXT',pagesTitle:'Album pages',pagesDesc:'Select a page to view it enlarged. Tape, creases, empty spots and the original arrangement have been preserved.',catalogSmall:'OBJECT-LEVEL SEARCH',catalogTitle:'Object catalog',typeAll:'All types',typeWrapper:'Wrappers',typeInsert:'Inserts',typeLabel:'Labels',typeTrace:'Album traces',confidenceAll:'All confidence levels',confidenceHigh:'High',confidenceMedium:'Medium',confidenceLow:'Low',thId:'ID / page',thPhoto:'Object photo',thName:'Name & design',thType:'Type',thOrigin:'Origin',thPeriod:'Estimated period',thConfidence:'Confidence',thSources:'Source',catalogFoot:'Dating is based on printed markings, documented series, and reference collections. Click a thumbnail to inspect a cropped object where available, or its original album page.',sourcesSmall:'DOCUMENTATION',sourcesTitle:'Sources and verification',sourcesIntro:'Links are provided for independently checking brand history, design movements and individual series. The original album remains the primary evidence for the objects themselves.',footerTitle:'FROM FLAVOR TO IMAGE · FAMILY ARCHIVE',footerText:'Varvara Antonova',close:'Close ×',counter:'Showing {n} of {all} entries',page:'Page {p}',pageRecords:'{p} · {n} records',openPage:'Open album page {p}',photo:'Photo from the family archive',openSource:'Open source',familyArchive:'Family archive',searchPlaceholder:'Brand, flavor, country, motif…',filterAll:'All',filterSoviet:'Rot Front',filterComics:'Comics',modalObject:'Object {id}',modalPage:'Album page {p}',noOriginal:'Original page scan',
 },
 ru: {
  eyebrow:'СЕМЕЙНЫЙ АРХИВ · ЧЕЛЯБИНСК И ПОЕЗДКИ',heroTitle:'ОТ ВКУСА<br>К ИЗОБРАЖЕНИЮ',lead:'Обёртки, комиксы, автомобильные вкладыши и маленькие печатные истории: история графического дизайна, сохранившаяся в одном семейном альбоме.',heroNote:'Исследовательский каталог · 24 октября 2026 · датировки со степенью достоверности',brand:'АРХИВ / 01',navResearch:'Исследование',navPages:'Страницы',navCatalog:'Каталог',navSources:'Источники',introSmall:'ВВЕДЕНИЕ',introTitle:'Когда упаковка пережила продукт',
  intro:'Жевательная резинка исчезала, а обёртки оставались. В этой коллекции вместе существуют история коммерческой графики, серийные вкладыши и материальные следы хранения. Американский брендинг, советская олимпийская графика, немецкие авторские комиксы, турецкие автомобильные карточки и югославские мультперсонажи соседствуют в одном альбоме.',statPages:'фотографии страниц альбома',statItems:'предварительных записей*',statSources:'библиографических источников',statYear:'документированная серия Otto und Alwin',statFoot:'* Это не количество уникальных физических экспонатов.',attributionHead:'Принцип атрибуции.',attribution:'Год появления бренда не равен году печати конкретной обёртки. Где нет датированного архивного совпадения, указан диапазон и степень уверенности. Сходство с Баухаусом, Memphis или поп-артом является формальным сравнением, а не доказательством прямого влияния.',
  readResearch:'Читать исследование',downloadResearch:'Открыть PDF',downloadWorkbook:'Скачать двуязычный каталог (Excel)',designSmall:'ИСТОРИЯ ДИЗАЙНА',designTitle:'Шесть графических языков в одном альбоме',pagesSmall:'СОХРАНЕНИЕ ИСХОДНОГО КОНТЕКСТА',pagesTitle:'Страницы альбома',pagesDesc:'Выберите страницу для просмотра в увеличении. Скотч, заломы, пустые места и порядок расположения сохранены.',catalogSmall:'ПОИСК ПО ПРЕДМЕТАМ',catalogTitle:'Каталог предметов',typeAll:'Все типы',typeWrapper:'Обёртки',typeInsert:'Вкладыши',typeLabel:'Этикетки',typeTrace:'Следы альбома',confidenceAll:'Любая достоверность',confidenceHigh:'Высокая',confidenceMedium:'Средняя',confidenceLow:'Низкая',thId:'ID / страница',thPhoto:'Фото предмета',thName:'Название и приёмы дизайна',thType:'Тип',thOrigin:'Происхождение',thPeriod:'Предполагаемый период',thConfidence:'Уверенность',thSources:'Источник',catalogFoot:'Датировки основаны на надписях, истории серий и музейных коллекциях. Нажмите миниатюру, чтобы открыть отдельный предмет, если он уже обрезан, или всю страницу альбома.',sourcesSmall:'ДОКУМЕНТАЦИЯ',sourcesTitle:'Источники и проверка',sourcesIntro:'Ссылки позволяют независимо проверить историю брендов, направления дизайна и отдельные серии. Основной источник информации о самих экземплярах — семейный альбом.',footerTitle:'ОТ ВКУСА К ИЗОБРАЖЕНИЮ · СЕМЕЙНЫЙ АРХИВ',footerText:'Варвара Антонова',close:'Закрыть ×',counter:'Найдено {n} из {all} записей',page:'Страница {p}',pageRecords:'{p} · {n} записей',openPage:'Открыть страницу {p}',photo:'Фото из семейного архива',openSource:'Открыть источник',familyArchive:'Семейный архив',searchPlaceholder:'Бренд, вкус, страна, сюжет…',filterAll:'Все',filterSoviet:'Рот Фронт',filterComics:'Комиксы',modalObject:'Предмет {id}',modalPage:'Страница {p}',noOriginal:'Исходная страница'
 }
};
const stories=[
 {date:{en:'1979 · EAST GERMANY',ru:'1979 · ГДР'},name:'OK Big Babaloo',desc:{en:'Two genuine Otto & Alwin comic strips, based on Jürgen Günther’s 1979 illustration series. The original frame and lettering have been retained.',ru:'Два оригинальных комикса Otto und Alwin из серии иллюстраций Юргена Гюнтера 1979 года. Оригинальная графика и надписи сохранены.'},img:'assets/details/ok_big_babaloo.jpg'},
 {date:{en:'FROM 1979 · USSR',ru:'С 1979 · СССР'},name:{en:'Rot Front · Olympic wrappers',ru:'Рот Фронт · олимпийские обёртки'},desc:{en:'Flavor color coding, pictograms, and Moscow 1980 symbolism in Soviet industrial packaging.',ru:'Цветовое кодирование вкусов, пиктограммы и символика Москвы-1980 в советской промышленной графике.'},img:'assets/details/soviet_flavors.jpg'},
 {date:{en:'BRAND FROM 1893 · UNITED STATES',ru:'МАРКА С 1893 · США'},name:'Wrigley’s Juicy Fruit',desc:{en:'The arrow, display lettering and yellow identity: compare the brand’s history with this particular wrapper, whose print date is still unknown.',ru:'Стрелки, акцидентный шрифт и жёлтая айдентика. Дата появления марки не равна дате печати именно этой обёртки.'},img:'assets/details/juicy.jpg'},
 {date:{en:'IRAN · WRAPPER UNDATED',ru:'ИРАН · ДАТА НЕ УСТАНОВЛЕНА'},name:'Wriggler’s Peppermint',desc:{en:'A similarly named brand, NOT Wrigley’s. The exact spelling is visible on the original wrapper.',ru:'Созвучная марка, но НЕ Wrigley’s. На оригинальной обёртке хорошо читается другое название.'},img:'assets/details/wriggler.jpg'},
 {date:{en:'CHARACTER FROM 1967 · YUGOSLAVIA',ru:'ГЕРОЙ С 1967 · ЮГОСЛАВИЯ'},name:'Profesor Baltazar',desc:{en:'A character from Zagreb animation appears on a Kraš gum wrapper, bridging television graphics and licensed packaging.',ru:'Персонаж загребской анимации на обёртке Kraš: связь между телевизионной графикой и коммерческой упаковкой.'},img:'assets/details/baltazar.jpg'},
 {date:{en:'AROUND 1990–1991 · TURKEY',ru:'ОКОЛО 1990–1991 · ТУРЦИЯ'},name:'Kent Turbo no. 184',desc:{en:'Vauxhall Calibra collector card combining vehicle photography, technical information and a serial number.',ru:'Коллекционная карточка Vauxhall Calibra: фотография автомобиля, технические характеристики и номер серии.'},img:'assets/details/turbo.jpg'}
];
const directions=[
 {en:['Early brand identity','Wrigley’s: constant color codes, arrows and repeated product names long before modern digital design systems.'],ru:['Ранняя фирменная айдентика','Wrigley’s: постоянные вкусовые цвета, стрелки и повторяемость названий ещё до современных брендбуков.']},
 {en:['Modernist-looking functional graphics','Clark’s, Velim and other wrappers: grids, restrained color, strong information hierarchy. Visual resemblance does not prove a Bauhaus attribution.'],ru:['Функциональная коммерческая графика','Clark’s, Velim: сетки, ограниченная палитра и чёткая иерархия. Сходство с модернизмом не доказывает авторство Баухауса.']},
 {en:['Typography as pattern','Life Savers and Adams inner foils: repetition turns a commercial name into an all-over surface design.'],ru:['Типографика как орнамент','Life Savers и фольга Adams: повторение превращает коммерческое название в сплошной графический паттерн.']},
 {en:['Authorial comics and licensing','Otto & Alwin, Professor Balthazar and animated characters: humor, sequential panels, outlines and familiar mascots.'],ru:['Авторский комикс и лицензирование','Otto und Alwin, профессор Бальтазар и мультперсонажи: юмор, последовательные кадры, контуры и узнаваемые герои.']},
 {en:['Postmodern-era playfulness','Kent Super Star and 1980s–1990s playful wrappers: bright palettes, display type, stars, motion and eccentric layouts.'],ru:['Игровая графика 1980–1990-х','Kent Super Star и другие яркие обёртки: акцидентный шрифт, звёзды, динамика, декоративная композиция.']},
 {en:['Collectible information design','Turbo and Oto Moto: numbered photos, vehicle specs and serial organization make a gum insert a pocket-sized reference card.'],ru:['Информационный дизайн коллекций','Turbo и Oto Moto: фотографии, характеристики автомобилей и номера серий превращают вкладыш в миниатюрную справочную карточку.']}
];
let lang='en',pageIndex=0,modalMode='page',modalObjectId=null;
const pageOrder=Array.from(new Set(objects.map(v=>v.page)));
function t(k){return UI[lang][k]||k}
function localized(o,field){return lang==='en'?(o[field+'_en']??o[field]):o[field]}
function closeModal(){byId('modal').classList.remove('on');byId('modal').setAttribute('aria-hidden','true')}
function openPage(page){modalMode='page';pageIndex=pageOrder.indexOf(page);modalObjectId=null;renderModal()}
function openObject(id){modalMode='object';modalObjectId=id;renderModal()}
function renderModal(){
 let src,title,caption;
 if(modalMode==='page'){
  const p=pageOrder[pageIndex];if(!p)return;
  title=t('modalPage').replace('{p}',p);src=`assets/pages/${p}.jpg`;caption=t('noOriginal')+' · '+p;
 }else{
  const o=objects.find(x=>x.id===modalObjectId);if(!o)return;
  src=o.detail_image||o.image;title=localized(o,'title');caption=`${o.id} · ${localized(o,'date_range')}`;
 }
 byId('modalTitle').textContent=title;byId('modalImage').src=src;byId('modalImage').alt=title;byId('modalCaption').textContent=caption;
 byId('prev').style.visibility=byId('next').style.visibility=modalMode==='page'?'visible':'hidden';
 byId('modal').classList.add('on');byId('modal').setAttribute('aria-hidden','false');
}
byId('closeModal').addEventListener('click',closeModal);
byId('modal').addEventListener('click',e=>{if(e.target===byId('modal'))closeModal()});
byId('next').addEventListener('click',()=>{pageIndex=(pageIndex+1)%pageOrder.length;renderModal()});
byId('prev').addEventListener('click',()=>{pageIndex=(pageIndex-1+pageOrder.length)%pageOrder.length;renderModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();if(byId('modal').classList.contains('on')&&modalMode==='page'){if(e.key==='ArrowRight')byId('next').click();if(e.key==='ArrowLeft')byId('prev').click()}});
const filters=[['','filterAll'],['Wrigley','Wrigley'],['Rot Front','filterSoviet'],['Kent','Kent'],['Dandy','Dandy'],['OK ','OK'],['Kraš','Kraš'],['comic','filterComics']];
function renderStories(){byId('stories').innerHTML=stories.map(s=>`<article class="story"><img loading="lazy" src="${s.img}" alt="${esc(typeof s.name==='string'?s.name:s.name[lang])}"><div class="date">${esc(s.date[lang])}</div><h3>${esc(typeof s.name==='string'?s.name:s.name[lang])}</h3><p>${esc(s.desc[lang])}</p></article>`).join('')}
function renderDirections(){byId('designGrid').innerHTML=directions.map(d=>`<article><strong>${esc(d[lang][0])}</strong><p>${esc(d[lang][1])}</p></article>`).join('')}
function renderPages(){byId('pageList').innerHTML=pageOrder.map(p=>{let group=objects.filter(x=>x.page===p);let preview=group.slice(0,2).map(o=>localized(o,'title')).join(' / ');return `<button class="pagecard" type="button" data-page="${p}" aria-label="${esc(t('openPage').replace('{p}',p))}"><img loading="lazy" src="assets/pages/${p}.jpg" alt="${esc(t('page').replace('{p}',p))}"><div class="pcbody"><strong>${esc(t('pageRecords').replace('{p}',p).replace('{n}',group.length))}</strong><span>${esc(preview)}…</span></div></button>`}).join('')}
function renderFilters(){byId('quickfilters').innerHTML=filters.map(([term,label])=>`<button type="button" class="chip" data-quick="${esc(term)}" style="border:0;cursor:pointer">${esc(t(label))}</button>`).join('')}
function typeMatch(o,v){if(!v)return true; if(v==='wrapper')return o.kind_en.toLowerCase().includes('wrapper');if(v==='insert')return o.kind_en.toLowerCase().includes('insert');if(v==='label')return o.kind_en.toLowerCase().includes('label');return o.kind_en.toLowerCase().includes('trace')}
function confidenceMatch(o,v){if(!v)return true;return o.confidence_en.toLowerCase().startsWith(v.toLowerCase())}
function renderCatalog(){
 const q=byId('query').value.toLowerCase().trim(),kind=byId('type').value,conf=byId('conf').value;
 const filtered=objects.filter(o=>(!q||[o.title,o.title_en,o.design_features,o.design_features_en,o.country,o.country_en,o.kind,o.kind_en,o.id,o.page,o.notes].join(' ').toLowerCase().includes(q))&&typeMatch(o,kind)&&confidenceMatch(o,conf));
 byId('counter').textContent=t('counter').replace('{n}',filtered.length).replace('{all}',objects.length);
 byId('rows').innerHTML=filtered.map(o=>{const first=o.source_ids.split(',')[0];const ur=sourceNames[first]&&sourceNames[first][1]||'';const remote=String(ur).startsWith('https://');const image=o.detail_image||o.image;return `<tr>
<td><b>${esc(o.id)}</b><small>${esc(o.page)}</small></td>
<td class="thumbcol"><button class="thumbButton" type="button" data-object="${esc(o.id)}" aria-label="${esc(localized(o,'title'))}"><img class="thumb" loading="lazy" src="${esc(image)}" alt="${esc(localized(o,'title'))}"></button></td>
<td class="namecell"><button class="linkp" type="button" data-object="${esc(o.id)}">${esc(localized(o,'title'))}</button><small>${esc(localized(o,'design_features'))}</small></td>
<td>${esc(localized(o,'kind'))}</td><td>${esc(localized(o,'country'))}</td><td class="datecell">${esc(localized(o,'date_range'))}</td><td><span class="pill">${esc(localized(o,'confidence'))}</span></td>
<td class="srccell">${remote?`<a href="${esc(ur)}" target="_blank" rel="noopener noreferrer">${esc(first)}</a>`:esc(t('familyArchive'))}</td>
</tr>`}).join('');
}
function renderSources(){byId('sourceList').innerHTML=Object.entries(sourceNames).map(([code,ar])=>{let label=lang==='en'?(sourceEn[code]||ar[0]):ar[0];let u=String(ar[1]);return `<li><b>${esc(code)}</b> ${esc(label)} · ${u.startsWith('https://')?`<a href="${esc(u)}" target="_blank" rel="noopener noreferrer">${esc(t('openSource'))}</a>`:esc(t('familyArchive'))}</li>`}).join('')}
function setLanguage(next){
 if(next!=='ru'&&next!=='en')return;lang=next;document.documentElement.lang=lang;
 document.title=lang==='en'?'From Flavor to Image | Family Chewing Gum Archive':'От вкуса к изображению | Семейный архив жвачек';
 document.querySelectorAll('[data-i18n]').forEach(el=>{el.textContent=t(el.dataset.i18n)});
 document.querySelectorAll('[data-i18n-html]').forEach(el=>{el.innerHTML=t(el.dataset.i18nHtml)});
 byId('query').placeholder=t('searchPlaceholder');byId('query').setAttribute('aria-label',t('searchPlaceholder'));
 document.querySelectorAll('.langswitch button').forEach(el=>{const yes=el.dataset.lang===lang;el.classList.toggle('active',yes);el.setAttribute('aria-pressed',String(yes))});
 renderStories();renderDirections();renderPages();renderFilters();renderCatalog();renderSources();
 if(byId('modal').classList.contains('on'))renderModal();
}
document.querySelector('.langswitch').addEventListener('click',e=>{const b=e.target.closest('button[data-lang]');if(b)setLanguage(b.dataset.lang)});
byId('query').addEventListener('input',renderCatalog);byId('type').addEventListener('change',renderCatalog);byId('conf').addEventListener('change',renderCatalog);
byId('rows').addEventListener('click',e=>{let b=e.target.closest('[data-object]');if(b)openObject(b.dataset.object)});
byId('pageList').addEventListener('click',e=>{let b=e.target.closest('[data-page]');if(b)openPage(b.dataset.page)});
byId('quickfilters').addEventListener('click',e=>{let b=e.target.closest('[data-quick]');if(b){byId('query').value=b.dataset.quick;renderCatalog()}});
setLanguage('en'); // English is the intentional default, even on file:// URLs.
