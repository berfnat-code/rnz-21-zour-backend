










export default async function handler(req, res) {
  // --- CORS ---
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') return res.status(405).json({ error: 'Méthode non autorisée' });

  const { code } = req.body;
  if (!code) return res.status(400).json({ error: 'Code manquant' });

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;
  const headers = {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
  };

  // Le code doit exister et être valide (même vérification que verify-code.js)
  const codeRes = await fetch(
    `${SUPABASE_URL}/rest/v1/access_codes?code=eq.${encodeURIComponent(code)}`,
    { headers }
  );
  const codes = await codeRes.json();
  if (!codes.length) return res.status(404).json({ ok: false, reason: 'code_introuvable' });

  // Contenu des zour 3 à 21 — jamais envoyé au navigateur sans code valide confirmé ci-dessus
  const LOCKED_DAYS = [
/* ---------------- ZOUR 3 ---------------- */
{n:3, phase:1, title:`PA TOUT OUT BANN PANSÉ I MÉRIT IN RÉPONS`,
intro:[
`Défoi in pansé i ariv dan nout lespri, é san mèm rann anou kont nou komans diskut ek li. Nou rod in répons, nou imazine le pir, nou artourn la situasion dan nout têt ankor é ankor, ziska fatig anou.`,
`Mé lès amwin poz aou in kestion : Kan in moun i téléfone aou alor ke ou lé déza okupé, eske ou réponn kan mèm ? La plipar du tan, non. Défoi ou lès soné, pa par méchansté mé paské ou choizi ke la sé pa le moman.`,
`É bien, ek out bann pansé lé parèy. Pa tout le bann pansé i pas dan out lespri i mérit touzour out latansion. Néna i vien é i arsava, néna i rod zist pou atir aou, é plis ou réponn plis zot i arvien.`,
`Zordi, nou sa dékouv in zafer sinp mé puisan. Défoi, la méyèr répons ke ou pé done a in pansé, sé de pa réponn ali.`],
verite:[
`Nou kroi souvan ke réponn a sak pansé, réponn a zot bezoin d’atansion, sé arpran le kontrol. An réalité, pa tout pansé i mérit out tan, ni out lénerzi. Défoi, le pli gran lakt de paix sé de lès in pansé pasé, san ofr ali in plas dan out zourné. Paské sak pansé ke ou désid de pa nouri zordi, i permèt de ardone aou in pé plis de liberté.`],
zest:[
`Pandan 2 minut, rèst sinpleman ousa ou lé.`,
`Kan in pansé i vien, ésèy pa sas ali mé ésèy pa non pli réponn ali.`,
`Di sinpleman dan out têt : “Mi remark pansé-la”.`,
`Pui, lès ali pasé san kontinié la konversasion ek li.`,
`Si in not pansé i ariv, fé éxakteman parèy.`],
zestNote:`A la fin dé 2 minut, demand aou : “lakel de tout bann pansé-la té mérit vréman mon latansion ?”`,
inportan:[
`Pa tout bann pansé lé urjan, néna i fé zist bonpé brui. Done pa la mèm valèr a sak pansé ki pas dan out têt. Plis ou aprann a choizir sek i mérit vréman out latansion, plis out lespri i artrouv la plas pou sek i kont vréman.`,
`Ou pé pa choizir kel pansé i vien, mé ou gayn choizir konbien de out tan ou done ali.`],
kestion:[
`Kel pansé la demand le plis ou latansion alor ke, o fon, li té mérit sinpleman ke ou té lès ali pasé ?`],
demin:[
`Nou pas énorméman de tan a rod sanz nout vi. Mé défoi, sé pa nout vi ki fatig anou, sé nout fason de réazir. É si le vré sanzman té komans par sek ou fé é pa par sek ou arèt fé ?`,
`Demin, nou sa rouv ankor in nouvo port.`]},

/* ---------------- ZOUR 4 ---------------- */
{n:4, phase:1, title:`SORT AN MOD “SURVI OTOMATIK”`,
intro:[
`Ziska zordi, nou la travay dési out lespri. Ou la aprann obsèrv out bann pansé, ékout out kor é choizir sek i mérit vréman out latansion. Mé zordi, nou sa gard in zafer ankor pli profon : out bann réaksion.`,
`Défoi nou kroi ke nou désid de tout, pourtan bonpé zafer i ariv san mèm ke nou pran le tan réfléchir. Nou réponn tro vit, nou di “oui” a tout, nou pran nout téléfone san rézon é nou réazi avan mèm de konprann sek i spas. A fors répèt bann zest-la, zot i fini par nir bann otomatism.`,
`Zordi, nou sa pa ésèy sanz tout d’in kou, nou sa sinpleman ralum in zafer ke bonpé domoun la oublié : nout konsians. Paské, a sak foi ke ou arèt ou ke ou mèt tout si poz pandan kelke segond pou rod konsiaman out prochin laksion, ou sort titapti du mod “survi otomatik.”`],
verite:[
`Défoi, ou travèrs tout in zourné san vréman viv ali. Pa paské ou lé pa prézan, mé paské out bann labitud i pran le desu dési out konsians.`,
`Kan ou viv tro lontan an mod “survi otomatik”, ou fini par kroir ke sé kom sa mèm ke la vi i doi êtr. Pourtan, artrouv la konsians sé artrouv dousman la liberté de choizir.`],
zest:[
`Zordi, choizi in zest ke ou fé tou lé zour, kom rouv in port, boir do lo ou alum out téléfone par éxanp.`,
`Avan komans out zest, arèt aou 3 segond.`,
`Pandan 3 segond-la, demand aou : “Mi choizi vréman de fé l’aksion-la ou bien mi fé ali par abitud ?”`,
`Ansuit, fé out laksion dousman an restan vréman fokus dési sek ou pou fé.`,
`Kan ou la fini, remark sinpleman : “Pou la premièr foi zordi, eske mi té vréman prézan dann zest-la ?”`],
inportan:[
`Riskap ke zest-la i paré aou tro sinp pou sanz in zafer, mé rapèl aou bien : sé pa la grandèr d’in zest ki sanz in vi, sé le fé de répèt ali an étan konsian.`,
`A sak foi ke ou kas in lotomatism, ou rapèl dousman a out lespri ke ou lé touzour kapab choizir.`],
kestion:[
`Pran in ti moman avan tourn la paz. Dan out zourné, kel zest ou la fé an étan plènman konsian de out laksion ? Lakel ou rann aou kont mintnan ke ou la fé ali an mod “otomatik” ?`],
demin:[
`Défoi, nou pans ke arpran le kontrol sé fèr in gran léfor, mé si le pli difisil lété pa de fèr plis, mé de fèr otreman ?`,
`Demin, nou sa tèst in zafer étonan, in ti choi, prèsk invizib, mé kapab de sanz le rèst de out zourné.`]},

/* ---------------- ZOUR 5 ---------------- */
{n:5, phase:1, title:`KRÉ IN PREMIÉ MIKRO-KONTROL`,
intro:[
`Bonpé domoun i atann le gran moman ki va sanz zot vi. Pourtan, nout vi i sanz preske zamé dan “bann gran moman”. Li sanz dan bann moman ke persone i war : kan ou désid de pa réponn tou d’suit, kan ou désid de pa atrap out téléfone, kan ou désid de fé otreman ke “d’abitud”. Sé dan bann ti zinstan invizib ke ou komans anfin a prann in nouvo direksion.`,
`In mikro-kontrol sé pa in gran léxploi, mé pou ou, li reprézant in zafèr bien pli inportan : la prèv ke ou lé kapab désidé avan d’azir. É sak foi ke ou fé sa, ou ranfors dousman la konfians ke ou gayn dési ou mèm.`,
`Sé paské ou komans azir otreman ke out konfians i grandi. Zordi, nou sa pa rod la perfeksion, nou sa zist kré in premié pa pou ke demin ou gayn arfé in not in pé pli fasilman.`],
verite:[
`Bien souvan, nou atann le méyèr moman pou nou komansé, pou lans anou, pou pas a laksion. Nou pans osi ke, kan nou va gayn plis kouraz, plis le tan ou plis motivasion, nou va anfin sanzé. Pourtan, bann sanzman i komans pa le zour ousa nou san anou pré, zot i komans le zour ousa nou désid sinpleman de fèr in premié ti pa.`,
`Sak foi ke ou choizi konsiaman, ou montr a ou mèm ke out vi lé pa selman gidé par bann sirkonstans ou par bann labitud. Ou rapèl aou ke ou néna ankor le pouvoir de choizir. Bien souvan, sé pa bann gran sanzman ki transform la vi in moun, sé le premié choi ke li oz anfin fèr.`],
zest:[
`Rod in ti laksion ke ou té fini prévoir fé zordi, pé inport lakel, pas laspiratèr, lir in liv ou ankor alé gard kourié.`,
`Avan komansé, arèt aou 5 segond é di dan out têt : “Sé mwin ki choizi fé sa é pa labitud.”`,
`Fé tout laksion dousman san présipitasion an restan prézan é konsian ziska la fin.`,
`Kan ou la fini, pran 10 segond san bouzé é remark sinpleman koman ou san aou apré awar désidé konsiaman.`,
`Sak ti choi konsian zordi, sé in ti pa an plis vèr le moun ke ou vé ni demin.`],
inportan:[
`Sé pa la perfeksion ki fé avansé, sé le fé de arkomansé, ankor é ankor, mèm apré in lékar. L’objektif zordi sé de prouv a ou mèm ke ou pé touzour arpran le semin, pé inport konbien de foi ou ralanti.`],
kestion:[
`Si ou té gayn sanz in labitud zordi pou amélior out vi, par lakel ou té koman ?`],
demin:[
`Zordi, ou la prouv aou ke ou pé choizir in laksion an plèn konsians. Mé na in kestion pli profon ankor : É si té pa out bann pansé ke té mérit ankor out tan é out lénerzi ?`,
`Défoi, nout lespri i fé tourn touzour lé mèm zafer dan nout têt, san aport vréman de solusion. Demin, nou sa aprann rekonèt bann pansé ki mérit pa out latansion.`]},
/* ---------------- ZOUR 6 ---------------- */
{n:6, phase:2, title:`REKONÈT IN PANSÉ INUTIL`,
intro:[
`Nou kroi souvan ke, si in pansé i pran bonpé la plas dan nout têt, sé paské li lé inportan. Pourtan, la plas in pansé i pran dan nout têt i reflèt pa la valèr ke li néna.`,
`Na bann pansé i èd a konprann, a désidé ou ankor a avansé, dot i tourn selman dan nout têt san aport anou de répons. Plis nou done azot nout tan é nout lénerzi, plis nou done azot l’inprésion d’êtr ésansiel, alor ke zot i fé souvan l’invèrs, zot i ralanti nout lespri.`,
`Zordi, nou sa pa rod a élimine bann pansé-la, nou sa aprann sinpleman a rekonèt sek i aport rien de konkré. Paské, kan ou ariv a disting in pansé inutil, ou komans déza choizir ousa mèt out latansion. É sé souvan la ke nout lespri i retrouv le kalm é in pé plis klarté.`],
verite:[
`Le pli fatigan sé pa touzour sek nou viv, sé souvan tout sek nou rakont a nou mèm otour de sek nou viv.`,
`In pansé i pé tourn dan nout têt pandan dé zèr, arni le matin, kontinié tout la zourné é ankor le soir. Pandan tan-la, la situasion i sanz pa, pir ankor, nout fatig intérièr i grandi. Nou fini par kroir ke, paské in pansé i arvien souvan, nou doi forséman ékout ali. Pourtan, na bann pansé i demand selman in sel zafer : ke nou arèt nouri azot.`,
`Le zour ousa ou konpran ke tout sek i travèrs dan out lespri i mérit pa out latansion, ou artrouv dousman la paix ke sertin pansé té vol aou.`],
zest:[
`Instal aou konfortableman é pran 2 gran respirasion.`,
`Kan in pansé i ariv, réponn pa li tou d’suit.`,
`Demand aou sinpleman : “Pansé-la, eske li èd amwin ou eske li fé ke tourn an boukl ?”`,
`Si li aport aou rien de nouvo ou ke ou estim ke li lé pa util, di aou dousman : “Mi rekoné aou, mé mi lé pa oblizé suiv aou.”`,
`Si, o kontrèr, li aport aou de l’èd, in solusion ou ankor in motivasion, ou pé nouri aou de li an dizan : “Mersi pou sek ou aport amwin.”`,
`Ramèn dousman out latansion dési out respirasion.`],
inportan:[
`In pansé i gayn plis de pouvoir selman si ou kontini nouri ali. Plis ou réponn a sak pansé, plis out lespri i kroi ke zot i mérit reni ankor. Défoi, le méyèr choi sé pa de trouv bann répons, mé sé osi d’aksepté ke bann pansé-la i mérit okin déba.`,
`Le but zordi sé pa de vid out lespri, sé plito d’aprann ke ou néna le droi de pa suiv tout sek out lespri i propoz aou konstaman.`],
kestion:[
`Kel pansé zordi la pran bonpé la plas alor ke, o fon, li la rien sanzé dan out zourné ?`],
demin:[
`Néna in zafer lé étranz, plis ou ésèy oubli in pansé é plis zot i arvien souvan. Akoz sa ?`,
`Demin, nou sa dékouv akoz nout lespri i fé sa é, sirtou, koman stop boukl-la avan ke li arpran le kontrol dési out lespri.`]},

/* ---------------- ZOUR 7 ---------------- */
{n:7, phase:2, title:`INTÉRONP IN BOUKL MANTAL`,
intro:[
`In boukl mantal lé kom in semin ke out lespri la fini aprann par kèr. San mèm réfléchir, li arpran touzour le mèm semin. A sak pansé, le parkour i paré pli naturèl ziska done l’inprésion ke i exist pa in not semin, kom si ou pouvé pa analiz ali otreman.`,
`Le problèm, sé pa le premié pansé. Le problèm, sé le moman ousa nout lespri i arkomans le mèm voyaz, san zamé ariv a in nouvo destinasion. Nou gaspi nout lénerzi a tourn an ron, alor ke rien i sanz vréman.`,
`Intéronp é remanié in boukl mantal sé pa lut kont out lespri, sé oz fèr in zafèr diféraman o moman prési ousa le sikl i voudré arkomansé. In ti l’intérupsion i sufi défoi a anpèch in gran fatig instalé.`,
`Zordi, ou sa antrèn in réflèx paské, nout fors i kontrui pa apré la tanpèt, li konstrui pandan ke li soufl.`],
verite:[
`Nou pas souvan nout tan a kroir ke sé nout bann problèm ki fatig anou alor ke, défoi, sé sinpleman nout lespri ki kontini arviv le mèm zafer san zaré.`,
`Le mond otour de nou i kontini avansé. Le tan i pas mé nout lespri i rèst bloké dési in sel moman, dési in sel dout ou mèm dési in sel pèr. É plis le sikl i dur, plis nou fini par pansé ke sort anndan-la lé inposib. Défoi, in sel instan ousa ou koup vréman in boukl mantal i sufi pou ardone out lespri in nouvo soufl.`,
`Persone i artrouv la paix paské li la tou konpri. Souvan, li artrouv la paix le zour ousa li arèt lès le mèm boukl désid a son plas.`],
zest:[
`Kan ou remark ke in pansé i komans tourn an boukl, ésèy de pa finir la fraz dan out têt.`,
`Arèt volontèrman o milié, pa bezoin rod la suit.`,
`Pran in zafer proch de ou, in stilo, in klé, in vèr, n’inport kosa. Ténir ali pandan 10 segond é resan sinpleman son poi, son form é son textur.`,
`Larg ali dousman é di aou mantalman : “La boukl-la la pa désid pou mwin.”`,
`Artourn ansuit a sek ou té pou fé, san arpran la pansé tou d’suit. Lès dé troi segond de silans avan kontinié.`],
zestNote:`Le but lé pa de fèr disparèt la pansé. Le but sé de kas le mouvman avan li fini antrèn aou. A sak foi ke ou fé sa, ou mont out lespri ki éxist in not semin ke la boukl abituèl.`,
inportan:[
`Ou la pa bezoin gayn kont sak pansé pou ou avansé. Défoi, le pli gran progré sé sinpleman de désid ke dé troi pansé i mérit pa out tan. A sak foi ke ou koup in boukl mantal, mèm si li arvien apré, ou antrèn dousman out lespri a dékouv ki éxist in not semin.`,
`Rapèl aou in zafer inportan : in boukl mantal i gayn de la fors dési ou a sak foi ou kontini mars dédan, mé le zour ousa ou désid de pa fèr in tour de plis, sé déza le débu de la liberté.`],
kestion:[
`Kan ou la intéronp in boukl zordi, kosa ou la resanti dan le silans zist apré ?`],
demin:[
`Défoi, nout lespri i fatig pa paské nou pans tro, li fatig paské li oubli ousa fo repozé. É si le kalm lété pa in zafer a rodé partou mé in zafer ke ou artrouv déza an ou ?`,
`Demin nou sa rouv in not port : Koman arnir dann prézan, san forsé, san luté, é san ésèy sas nout bann pansé ?`]},

/* ---------------- ZOUR 8 ---------------- */
{n:8, phase:2, title:`ARNIR DANN PRÉZAN SAN ZÉFOR`,
intro:[
`Nou kroi souvan ke nou lé plènman dan le moman prézan. Mé si nou té onêt ek nou mèm, konbien de moman nou viv vréman, san ke nout lespri i fini a in moman doné a alé ayèr ?`,
`Nout kor i mars, i koz, i travay, i manz, mé nout lespri ali li lé déza dan demin, dan ièr ou dan bann sénario ki éxist pa ankor. É a fors abit partou, nou fini par oubli le sel landroi ousa la vi i pas vréman : le prézan.`,
`Sé pou sa ke bonpé domoun i kroi ke artrouv le kalm du prézan lé konpliké é pourtan, le prézan té zamé alé. Sé nou ki pran tro de distans ek li, san mèm remarké.`,
`Zordi, nou sa pa aprann a fors out lespri a rèst trankil. Nou sa aprann sinpleman koman arni dan le prézan san fors anou. É sak foi ke ou arvien dan sek ou war, sek ou antann, sek ou resan é sak ou fé, ou ardone in plas a la vi réèl.`,
`Défoi le pli gran soulazman i komans pa kan “tout i sanz”, li komans kan ou arèt viv partou, sof dan le moman ke ou pé vréman profité : l’instan prézan.`],
verite:[
`Nou réaliz souvan la valèr d’in moman selman kan li la fini pasé.`,
`Pandan ke li lé la devan nou, nout lespri lé déza ayèr. É pourtan, sé souvan dan bann moman ordinèr ke nou regrèt le plis de pa avoir véku vréman.`,
`Kan ou manz san gouté, kan ou koz san ékouté, kan ou mars san remark kèl koté ou lé, ou pèrd pa zist in moman, ou pèrd in bout de out prop vi.`,
`É, défoi, sé dan in sel vré moman véku ke nou artrouv la paix.`],
zest:[
`Arèt tout sek ou la pou fé pandan 1 minut.`,
`Rod in lobjé devan ou, pé inport kosa i lé, in vaz, in liv, in télékomand etc.`,
`Pandan 30 segond, gard ali kom si té la premièr foi ou té war ali vréman.`,
`Remark bann ti détay ke ou té zamé port atansion.`,
`Apré, fèrm out zyé 5 segond é ésèy rapèl aou de l’objé ke ou la observé ek tout son bann détay.`,
`Rouv out zyé é konpar ek la réalité.`],
inportan:[
`Nout latansion sé in choi, mé souvan nou lès lé zot zafer choizir a nout plas : distraksion, intérupsion, le mank d’anvi ou de motivasion.`,
`Zordi, ou la pa obsèrv in lobjé pou mémoriz ali “a vi”. Ou la antrèn out kapasité a choizir ousa ou mèt tout out latansion. É sak foi ke ou désid konsiaman ousa ou gard, ousa ou ékout ou ankor kosa ou resan, titapti ou arpran in ti bout de out liberté ke out lespri té fini vol aou.`],
kestion:[
`Kan ou la ramèn out latansion dan le prézan a la suit de l’éxersis, eske ou la remarké koman ou la koz ek ou mèm a se moman-la ? Eske out bann parol té plito pozitif anvèr ou mèm ou bien zot la plito “fatig” aou ankor plis paské té négatif ?`],
demin:[
`Défoi, le pli gran konba lé pa dan nout bann pansé. Li lé dan la fason ke nou réponn anou a nou mèm.`,
`In mèm zafer i pé ariv a dé moun diféran, mé sé souvan zot dialog intérièr ki fé tout la diférans.`,
`Demin, nou sa dékouv koman arèt juj anou paské, défoi, nout pli gran ladverser sé la voi ke nou port anndan nou mèm dépi lontan.`]},

/* ---------------- ZOUR 9 ---------------- */
{n:9, phase:2, title:`ASÉ JUJ AOU`,
intro:[
`Nou pas souvan plis de tan a konbat kont nou mèm k’a konbat nout bann vré problèm. É défoi, le pli dir sé mèm pa sek i ariv anou, sé tout sek nou ajout apré.`,
`In lérèr i devien pou nou in prèv ke “Nou lé pa asé …”. In retar i devien in rézon pou kritik anou. In zourné difisil i devien in jujman dési nout valèr. Titapti, sé pa la réalité ki fatig le plis, sé la manièr don nou rakont la réalité a nou mèm.`,
`Le pir sé ke voi-la i paré normal. Nou ékout ali telman souvan ke nou kroi ke sé sa la vérité. Mé in pansé répété lé pa forséman in vérité, é in kritik intérièr lé pa forséman in bon konsèy.`,
`Zordi, nou sa pa aprann a pans pozitif, ni rod pou fé sanblan ke tout va bien. Nou sa aprann a rekonèt kan nout prop voi i arèt èd anou é ke li komans plito a blès anou, paské la bienvéyans anvèr nou-mèm sé pa in féblès. Défoi, sé mèm le premié pa vèr in véritab sanzman.`],
verite:[
`Kan ou répèt in kritik asé lontan, ou fini par kroir ke sé réèlman la vérité san armèt ali an kestion. Pourtan, sé paské in pansé i arvien souvan ke li dékri kisa ou lé réèlman.`,
`Défoi, nout jujman i koz telman for ke nou fini par oubli l’ésansiel : nou lé pa la voi ki kondane, nou lé le moun ki ékout. É tank ou kroi ke voi-la sé ou, sak lérèr i devien in prèv kont ou, é sak difikilté i devien in kondanasion.`],
zest:[
`Kan ou fé in ti lérèr ou bien kan in pansé kritik i vien, arèt aou in moman san azir.`,
`Demand aou : “Si té in dalon dann situasion-la, eske mi té koz ek li koma ?”`,
`Si la répons sé “non”, ranplas out kozman par in fason pli zist é pli dou.`,
`Par exanp : “Mi lé nul.” → “Ma fé in lérèr, mé mi pé aprann.”`,
`Inspir profondéman in foi é répèt nouvo fraz-la dousman dan out têt.`],
zestNote:`Le but lé pa de fèr kom si tout i alé bien, le but sé sinpleman d’arèt ajout in soufrans an plis ke sek ou viv déza.`,
inportan:[
`Kan ou surpran aou an trin juj aou, rajout pa in dézièm jujman. Défoi nou juj anou, pui nou juj anou paské nou la juj anou. Sé an fezan kom sa mèm ke la soufrans i kontini grandir.`,
`Lès out bann jujman éxisté san done azot tout out pouvoir. Ou pé ékout azot san obéir. In pansé lé pa in lordr é in kritik lé pa in vérité. Plis ou aprann a gard in distans ek bann voi-la, plis ou artrouv la liberté pou choizir koman réazir.`,
`Rapèl aou ke ou la pa bezoin gayn le dernié mo kont in jujman, ou la zist bezoin arèt lès ali gayn le premié.`],
kestion:[
`Kan zordi ou la fé in lérèr, eske ou la korij ali ou bien eske ou la kondane aou ?`],
demin:[
`Défoi, nout jujman i fé kroir anou ke nou lé fèb, alor ke riskap sé zist nout kor é nout lespri ki demand in pé plis répi.`,
`É si le problèm lété pa ou mé sinpleman l’éta d’espri dan lakel ou lé zordi ? Demin, nou sa aprann la diférans antr “fatig” é “féblès”. Paské konprann nuans-la i pé évit anou port in jujman injust anvèr nou mèm.`]},

/* ---------------- ZOUR 10 ---------------- */
{n:10, phase:2, title:`DIFÉRANSIÉ “FATIG” É “FÉBLÈS”`,
intro:[
`Le pli danzéré sé pa d’êtr “fatigé”, le pli danzéré sé kroir ke la fatig i rakont kisa ou lé.`,
`Kan l’énerzi i bès, nout lespri i ranpli le vid ek bann konkluzion kom “Ou lé pa asé for”, “Ou régrès”, “Ou va zamé arivé”. Pourtan, in kor épuizé i réfléchi rarman ek justès. Sek ou resan a se moman-la sé pa forséman sek lé vré.`,
`In moun fatigé é in moun fèb lé pa la mèm persone. Na in i demand in tan pou rékupéré, lot sé in jujman ke nout lespri i ajout par desu. É tank nou mélanz lé dé, nou risk de pous nout kor o moman mèm ousa li demand du repo, é kritik nout kèr alor ke li ésèy sinpleman ténir avek.`,
`Zordi, nou sa pa rod ni pli for. Nou sa aprann a ékouté avan de konklur. Paské défoi, le pli gran signe de fors sé de rekonèt ke sé pa ou ki mank de valèr mé ke sé ou ki mank in pé plis de repo.`],
verite:[
`Kan ou lé “fatigé”, méfi aou de bann konkluzion ke ou port anvèr ou mèm. Défoi sé pa out kor ki sanbl êtr lour, sé zist ou ki port ali san lénerzi.`,
`Nou pran défoi bann gran désizion dan bann mové moman : nou abandone, nou dout de nout kapasité, nou kroi ke tout lé fini.`,
`Avan désid ke ou lé pa kapab, demand aou avan si ou lé vréman fèb ou sinpleman épuizé. Défoi, in bon ti nui, in vré repo ou in ti soufl i répon mié a out bann bezoin, a sek out lespri i demand, ke mil jujman.`],
zest:[
`Arèt in moman é pans a in zafer ke ou pans ou gayn pa fé, kom par exanp fèr out séans de spor.`,
`Demand aou : “Eske mi lé vréman pa kapab ou mi lé sinpleman fatigé ? Si mi té bien repozé, eske mi té pans parèy ?”`,
`Ékri mantalman out répons san juj aou.`,
`Termine ek in fraz sinp : “Mi pé pran in poz san kroir ke mi lé fèb.”`],
inportan:[
`Pran zamé in désizion définitiv dan in éta provizoir. Kan ou lé fatigé, out regar i sanz. Sek ou pans de ou, de out vi ou de out kapasité lé pa forséman la réalité. Atann ke out lénerzi i arvien avan de kroir tout sek out lespri i rakont aou.`,
`Défoi, ou la pa bezoin sanz de vi, ou la zist bezoin de rékupéré avan de désidé.`],
kestion:[
`Si ou anlèv la fatig dési ou zordi, eske ou kroi touzour sek ou pans de ou ?`],
demin:[
`Nou grandi souvan ek l’idé an têt ke plis nou fé, plis nou avans.`,
`Mé si la fatig ke nou resan lété la prèv ke nou fé tro o lié de fèr l’ésansiel ?`,
`Demin, nou sa dékouv ke la vré progrésion i dépan pa touzour de la kantité. Défoi, li komans kan ou choizi de fé moin, mé ou fé ali plènman.`]},
/* ---------------- ZOUR 11 ---------------- */
{n:11, phase:3, title:`FÉ MOIN, MÉ FÉ MIÉ`,
intro:[
`Nou kofon souvan le “mouvman” ek le “progré”.`,
`A fors touzour fé plis, nou fini par kroir ke sak tach an plis, sak éfor an plis ou sak minit an plis i raproch anou forséman de nout lobjèktif. Pourtan, lé pa paské nou lé “okupé” ki voudré dir ke nou avans.`,
`In lespri fatigé i sot d’in zafer a in not, li komans bonpé, mé li termine peu. É a la fin de la zourné, nou resan la fatig d’awar tout ésyé san awar vréman done le méyèr de nou mèm dan l’ésansiel.`,
`Le pli difisil sé pa touzour de fèr plis. Défoi, le pli kourazeu sé de choizir sek i mérit vréman nout tan é aksépté de lès le rèst si koté. Paské, sak “oui” ke ou done a in zafer, sé osi in “non” ke ou done a in not.`,
`Zordi, nou sa pa aprann a ranplir nout zourné, nou sa aprann a protèz nout lénerzi. Paské la kalité de sek ou konstrui i dépan rarman du nonbr de zafer ke ou antrepran, mé de l’atansion ke ou done a sek i kont vréman.`],
verite:[
`A la fin d’in zourné, nou retras mantalman souvan tout sek nou la fé, mé nou demand anou rarman : “Eske mi té vréman prézan pandan ke mi té fé sa ?”`,
`Nou pé ranpli nout zourné du matin o soir, é malgré tou resantir ke nou la rien véku. Sé pa touzour le mank de tan ki fatig nout kèr, défoi sé le mank de prézans dan sek nou fé.`,
`La vi i rékonpans pa sek i kour le plis, li remark sirtou domoun ki viv plènman sek zot la choizi kom ésansiel pou zot. Bien souvan, fèr moin sé zisteman sek i permèt anfin de fèr lé choz ek tout son kèr.`],
zest:[
`Pans a 3 zafer ke ou té prévu fé zordi.`,
`San réfléchir lontan, demand aou : lakel lé vréman ésansiel ? lakel i pé atann ? lakel mi fé selman par abitud ?`,
`Pandan 2 minut, fé unikman out laksion ésansiel san touch a rien dot.`,
`Kan ou termine, remark la diférans antr : fèr bokou é êtr prézan dan in sel laksion.`],
zestNote:`Isi, le but lé pa de fèr moin par parès. Le but sé d’aprann ke, kan ou done tout ou latansion a l’ésansiel, ou done souvan plis de valèr a sek ou konstrui.`,
inportan:[
`Le problèm sé pa ke nou mank de tan, le vré problèm sé ke nou done souvan le méyèr de nou mèm a sek i kont le moin.`,
`Sak foi ke ou dispèrs out latansion, ou retir in ti bout a tout sek i mérit vréman ali.`,
`Rapèl aou ke protèz out tan lé bien, protèz out latansion lé ankor pli inportan.`],
kestion:[
`Kel zafer ou la fé zordi ke la vréman fé avans aou ?`],
demin:[
`Nou yèmré ke sak zour ki pas lé in bon zour, mé la vi i mars pa koma. É si out valèr lété pa défini par out méyèr zourné ni out pir zourné ?`,
`Demin, nou sa dékouv akoz aksèpt bann zour “nul” sé pa abandoné é ke, défoi, sé zisteman sa ki anpèch aou de pa abandoné.`]},

/* ---------------- ZOUR 12 ---------------- */
{n:12, phase:3, title:`AKSÈPT BANN “ZOUR NUL”`,
intro:[
`Persone i gard dann sièl ranpli de nuaz an dizan ali “Solèy la disparu.” Pourtan, bonpé parmi nou i fé éxakteman sa ek son prop vi. In mové zourné i sufi défoi pou nou kroir ke nou rekul, ke nou sanz pa ou ankor ke tout nout bann zéfor i sèrv a rien. Kom si in sel mové zour té kapab éfas tout le semin ke nou la déza parkouru.`,
`Mé “in zour nul” lé pa in prèv ke ou échou. Li rapèl aou sinpleman ke ou lé osi humin avan tou. Persone dan la vi i avans an ligne droit. Mèm la mèr i koné bann vag, mèm la natur i koné bann sézon. Akoz nout vi i devré avans otreman ?`,
`Persone i konstrui in vi selman ek bann “bon zour”. Sé osi bann zour difisil ki aprann anou pasianté é persévéré. Kan tout i paré pli lour, kontinié mèm dousman, sé déza in viktoir. Paské sé souvan dann silans, souvan mèm loin du regar domoun, ke nout pli gran sanzman i komans.`,
`Sek lé inportan sé pa d’évit bann mové zour, sé plito d’arèt lès in sel mové zour rakont tout out listwar. In zour difisil i dékri “in moman” mé zamé le moun ke ou lé.`],
verite:[
`Le pli gran pièj de bann zour difisil sé pa la fatig ni la tristès, sé tout sek nou désid kroir dési nou mèm pandan bann moman-la.`,
`Défoi, nou fini par abandoné, nou dout de nout semin, nou armèt tout nout valèr an kestion. Alor ke, bien souvan, nou la pou zist travèrs in mové pasaz. Tout bann pansé i mérit pa d’êtr pri o sérié, sirtou bann pansé ki né kan le kèr lé fatigé.`,
`Rapèl aou in zafèr : in mové moman i pé vizit out vi, mé li gayn pa le droi de définir kisa ou lé.`],
zest:[
`Pans a in zafer ke la pa marsé kom ou té espèr zordi.`,
`Di aou fraz-la : “Zordi, sa la ariv amwin é mi aksèpt ke zourné-la lé pa oblizé d’êtr parfé.”`,
`Ansuit, rod in sel zafer ki, malgré tou, la été korèk zordi.`,
`Pran 30 segond pou rekonèt ali.`,
`Termine ek fraz-la : “In mové moman i rakont pa tout mon zourné”.`],
inportan:[
`Tout bann zourné i demand pa souvan in solusion. Défoi, sek zot i demand sé ke ou arèt lut kont zot.`,
`Plis ou refuz in zourné difisil, plis ou ajout de la fatig a la fatig déza prézan. Aksèpt in mové moman sé pa bès lé bra, sé arèt gaspi out lénerzi kont in réalité ke ou gayn pa sanzé tou d’suit.`],
kestion:[
`Si zordi té selman in paz de out listwar, eske ou té lès ali désid de tout out liv ?`],
demin:[
`Nout lespri i prévien souvan avan ke li krak.`,
`Mé kom nou ékout pa bann ti signio ke li anvoy anou, nou remark ali selman kan lé déza tro tar.`,
`Demin, nou sa aprann a rekonèt bann limit mantal avan ke sé la fatig ki désid a nout plas.`]},

/* ---------------- ZOUR 13 ---------------- */
{n:13, phase:3, title:`APRANN DI “ASÉ”`,
intro:[
`Le pli gran mank de respé ke nou pé défoi fèr, sé anvèr nou mèm. Nou kontini alor ke nout lespri i demand in poz. Nou aksèpt ankor alor ke anndan i di “STOP !”. Nou dépas nout bann limit zisko poin ousa nou fini par kroir ke oubli anou sé sinpleman in manièr normal de viv.`,
`Pandan lontan nou kroi ke dir “asé” sé abandoné. Alor nou kontini, nou aksèpt ankor, nou pous ankor. Pourtan, sak foi ke nou dépas volontèrman sek nou resan, nou anvoi dousman in mésaz anvèr nou mèm : “Sek mi resan lé moin inportan ke tou le rèst.” É a fors répèt mésaz-la, nou fini par pi ékout anou.`,
`Dir “asé” sé pa renons a la vi, sé refuz de kontini viv kont ou mèm. Paské nout limit i éxist pa pou anpèch anou avansé, zot i éxist pou permèt anou avansé, san pèrd nout semin.`],
verite:[
`Pandan lontan nou la kru ke done touzour plis sé in prèv de kouraz. Pourtan, le vré kouraz sé d’arété avan de pèrd sek i kont le plis : anou mèm. Tout sek ou refuz d’arété zordi, ou risk de payé demin.`,
`Savoir ziska ousa i fo alé, sé in fors.`,
`Savoir kansa arété, sé souvan in sagès.`],
zest:[
`Arèt tout sek ou fé pandan 2 minut.`,
`Pandan tan-la, désid volontèrman de rien produir, de rien ékouté, de rien rézoud é de rien préparé.`,
`Obsèrv sinpleman sek i spas an ou.`,
`A la fin dé 2 minut, demand aou : “Mi té vréman présé ou bien mi té sinpleman abitué a zamé arété ?”`,
`Termine par fraz-la : “Mi na le droi de fèr in poz avan ke sé mon lespri ki inpoz ali amwin”.`],
inportan:[
`Sak foi ke ou dépas volontèrman out bann limit, ou apran dousman ke out bien lêtr i pé atann.`,
`O débu, sa i paré san konsékans, pui i devien in labitud. É in zour, ou réaliz ke ou done fasilman le tan, lénerzi ek la pasians a tout domoun, sof a ou mèm.`,
`Bann limit ke ou respekt zordi i pé èd aou a konstrui la paix ke ou va viv demin.`],
kestion:[
`Kisa i pran soin de ou kan sé ou mèm ki refuz ékout out bann limit ?`],
demin:[
`Mèm kan ou aprann a respekt out prop ritm, na ankor in pièj ki pé fé dout aou de tout : sé le moman ousa ou komans konpar out semin ek sek lé zot.`,
`Demin, nou sa war akoz konpar anou i vol souvan la paix ke nou la komans trouvé é koman arni dési nout prop semin.`]},

/* ---------------- ZOUR 14 ---------------- */
{n:14, phase:3, title:`ARÈT KONPAR AOU`,
intro:[
`La konparézon i komans rarman paské ou mank de valèr, li komans souvan paské ou oubli tout le semin ke ou la déza parkouru.`,
`Le regar i trouv touzour in moun ke na “plis”, plis l’arzan, plis la boté, plis la notoriété, in moun ki paré “pli for” ke nou, plis sesi, plis sela. Mé tank ou mezur out vi ek sek in not, ou pas a koté la sel choz ke persone i poura viv a out plas : out prop semin. Sek i fé la richès d’in vi sé pa d’êtr devan in moun, sé d’avansé san pèrd de vu kisa oulé.`,
`Pourtan, sak moun i avans ek son prop listwar, son bann blésur, a son ritm é ek son bann konba invizib. Konpar 2 sapit sé souvan konpar 2 listwar san zamé awar lu le mèm livr.`,
`Zordi, nou sa pa aprann a êtr méyèr k’in not, nou sa aprann a retrouv le plézir d’avansé san transform sak pa ke nou fé an konpétision. Paské le sel semin ke nou viv zisko bou, sé la not.`],
verite:[
`La konparézon i sanz rarman la réalité, mé li sanz prèske touzour le regar ke nou néna dési nout prop vi.`,
`A fors gard sek lé zot néna de plis ke ou, ou risk oublié tout sek ou la déza fine konstrui dan out vi. In moun rekonésan i avans bien souvan pli loin k’in moun ki pas son tan a konpar ali. Pa paské li néna plis, mé paské li war ankor la valèr ke li posèd déza.`,
`Le bonèr i komans rarman kan ou gayn plis. Défoi, li komans kan ou arèt kroir ke sek ou néna lé zamé asé.`],
zest:[
`Pans a in moun a ki ou konpar aou souvan.`,
`Pandan 2 minut, lès konplètman moun-la si le koté.`,
`Poz aou kestion-la : “Si ou té konpar aou ek le moun ke ou lété ièr, kosa la fini sanzé ?”`,
`Trouv in sel répons, mèm si li paré ti.`,
`Di aou fraz-la : “Mi avans a mon ritm é sak pa mi fé i kont.”`],
zestNote:`Le but isi sé pa de rod pou êtr méyèr ke lé zot, le but sé d’arèt oubli le semin ke ou mèm ou la fini parkourir.`,
inportan:[
`La konparézon i komans le zour ousa ou arèt gard out prop semin é ke ou komans gard rienk sek lé zot.`,
`La konparézon i pous anou a kour dérièr bann rèv, bann objèktif ou mèm bann anvi ki vien mèm pa de nou.`,
`Le pli bo semin sé pa sek i inprésione le plis, sé sek i resanb vréman a la persone ke ou lé.`],
kestion:[
`Si persone té la pou gard aou, konpar aou é juj aou, eske ou té kontini éxakteman dan la mèm direksion ?`],
demin:[
`Nou atann souvan ke tout i devien vréman mal avan de komans a prann soin de nou mèm.`,
`Pourtan, la vi i prévien rarman d’in sel kou. Li komans souvan par bann ti signo ke nou choizi de armèt pou pli tar.`,
`Demin, nou sa dékouv akoz atann le dernié signal i kout souvan bokou pli chèr ke d’ékout le premié.`]},

/* ---------------- ZOUR 15 ---------------- */
{n:15, phase:3, title:`ATANN PA LE DERNIÉ SIGNAL`,
intro:[
`Nout lespri na in drol de fason de protèz anou, li fini par abitu ali a preske tout, mèm a sek i de vré fé soufr ali.`,
`O débu, in zafer i déranz anou, pui nou di anou “Lé pa grav” ou “Mi va jéré.” É titapti nou aksèpt sek zamé nou noré aksépté avan. Le vré danzé sé pa ke le bann signo i disparèt, sé ke nou fini par trouv azot normal.`,
`Défoi, nou kroi ke bann gran difikilté i ariv d’in kou, mé souvan, li grandi dousman pandan ke nou apran a viv ek bann mal êtr ke nou ékout pi.`,
`Zordi, nou sa pa viv dan la pèr du moindr signal, nou sa sinpleman aprann a ékout nout lespri avan ke li lé oblizé krié pou li êtr antandu.`],
verite:[
`Défoi nou rèst telman lontan dan la mèm fatig, le mèm strès ou le mèm mal êtr ke nou fini par kroir ke sé kom sa ke nou lé. Pourtan, êtr abitué a in doulèr sé pa gérir, sé selman arèt étone anou ke li lé touzour la.`,
`Le pli gran pièj sé pa la soufrans, sé le zour ousa ou arèt de war ke li éxist ankor.`,
`Tout sek ou suport an silans i mérit peut êtr pa plis de kouraz mé sinpleman d’êtr anfin regardé an fas.`],
zest:[
`Pandan 2 minut fèrm out zyé é arpans out zourné.`,
`Poz aou kestion-la : “A kel moman zordi ma santi in signal ke ma choizi ignoré ?”`,
`Signal-la i peu êtr in fatig, in liritasion, in lanvi de fèr in poz, in bezoin de dir non, ou sinpleman in moman ousa ou té pi prézan.`,
`Choizi in sel signal.`,
`Tèrmine l’éxersis-la an tenan l’angazman-la : “La prochèn foi ke signal-la i arvien, mi pran 30 segond pou ékout amwin avan de kontinié.”`],
zestNote:`Rod pa tou sanzé zordi mèm. Le but sé aprann a rekonèt le premié chuchotman avan antann le dernié kri.`,
inportan:[
`Sak signal ke ou ignor zordi i arvien souvan demin ek plis de fors.`,
`La vi i fonksione rarman par surpriz, li fonksione par akumulasion. Sek ou repous ankor é ankor i fini souvan par désid a out plas. Sé pou sa ke bann sanzman kan lé fé a tan i vo plis k’in gran désizion pri tro tar.`,
`Ékout in signal sé pa viv dan la pèr, sé choizir d’azir pandan ke ou néna ankor le choi.`],
kestion:[
`An zénéral, eske ou atann ke out bann signo i devien “in kri” avan ou ékout zot ?`],
demin:[
`Persone i avans san fèr d’érèr é pourtan, bonpé i abandone pa a koz de l’érèr mé a koz de sek zot i désid de kroir apré.`,
`Défoi, in sel fo pa i sufi pou fé kroir ke tout lé perdu. Mé an réalité, in lérèr i éfas zamé tou le semin ke ou la déza parkouru.`,
`Demin, nou sa war akoz pèrd kouraz apré in lérèr lé souvan bokou pli danzéré ke lérèr an li mèm.`]},
/* ---------------- ZOUR 16 ---------------- */
{n:16, phase:4, title:`PÈRD PA KOURAZ APRÉ IN LÉRÈR`,
intro:[
`In lérèr i rakont zamé kisa ou lé, li rakont selman sek la arivé.`,
`Pourtan, bonpé parmi nou i transform in sel fo pa an in jujman définitif. Nou pas rapidman de “Ma la fé in lérèr” a “Mi lé in lérèr”. É san mèm rann anou kont, nou lès “in moman” désid de tout nout valèr.`,
`Persone dan la vi i apran a marsé san tonbé, tou kom persone i konstrui in vi san tronp ali. Sek i fé grandir in moun sé pa le nonbr d’échek ke li évit, sé le kouraz ke li trouv pou arkomansé malgré li.`,
`Zordi, nou sa pa aprann a êtr parfé, nou sa aprann a fèr la paix ek nout bann lérèr pou ke zot i devien bann leson é zamé in prizon.`],
verite:[
`Défoi, nout pli gran lérèr sé pa le fo pa an li mèm, sé le kouraz ke nou pèrd zist apré.`,
`In lérèr i dur défoi kelke minut, mé le dékourazman ali li pé dur dé zané si nou désid de done ali tout la plas. Sak persone ke ou admir zordi i port osi bann zérèr ke persone i war.`,
`Le pièj sé pa l’érèr an li mèm, sé plito le moman ousa ou komans a kroir ke li di la vérité dési kisa ou lé. In lérèr i pé ralantir out semin, mé sé selman si ou abandone ke li devien la fin de out listwar.`],
zest:[
`Pans a in lérèr ke ou la fé résaman.`,
`San rod alé dann détay, fini fraz-la : “Gras a lérèr-la, mi konpran zordi ke...”`,
`Gard in sel leson.`,
`Astèr, demand aou : “Si situasion-la i arvien demin, kosa mi feré diféraman ? “`,
`Fini ek fraz-la : “La leson, mi gard. La kulpabilité, mi lès alé.`],
inportan:[
`In lérèr i devien rarman in prizon. Sé le regar ke ou gard dési li ki fini défoi par fèrm la port.`,
`Tout domoun i tonb, tout domoun i tronp. La diférans sé pa l’érèr, sé sek sakin i désid d’an fèr apré. Néna i war la prèv ke zot lé pa kapab, dot i trouv in rézon pou mié arkomansé.`],
kestion:[
`Si ou retir la pèr d’échoué, kosa ou ozeré anfin arkomansé, ou mèm komansé ?`],
demin:[
`Défoi, le pli gran kouraz sé pa selman de arlévé, sé osi konèt ousa artourné kan la vi i sekou tout.`,
`Kan tout i devien bruiyan, strésan ou insertin, sakin la bezoin d’in landroi, d’in labitud ou d’in moman ki rapèl azot : “Mi pé ankor artrouv mon kalm.”`,
`Demin, nou sa dékouv koman konstruir out prop refuj, in zafèr sinp mé kapab soutenir aou dan bann zour lé pli difisil.`]},

/* ---------------- ZOUR 17 ---------------- */
{n:17, phase:4, title:`TROUV OUT REFUJ`,
intro:[
`Kan tout i bouz otour de ou, le pli inportan sé pa de kontrol la tanpèt, sé de konèt l’androi ousa ou gayn ténir.`,
`Défoi nou pas nout tan a rod bann solusion a l’extérièr : in nouvo projé, in nouvo labitud ou ankor in nouvo moun a ki “akroch” anou. Pourtan, sek i èd le plis dan bann moman difisil sé souvan d’artrouv in landroi, in zèst ou in moman ki rapèl a nout lespri : “Tèrla, ou pé relaché.” Tank ou na poin refuj-la, sak difikilté i paré aou pli gran ke sek li lé réèlman.`,
`In refuj sé pa in landroi ousa ou fui la vi, sé in landroi ki èd aou artrouv le kalm pou artourn viv out vi plènman, é la diférans lé énorm. Fuir i éloign bann problèm, arsoursé i done la fors pou afront bana.`,
`Zordi, nou sa pa aprann a évit bann tanpèt, nou sa plito aprann konstruir in poin d’ankraj ke mèm bann tanpèt va pa gayn anport ek zot.`],
verite:[
`Le problèm lé pa ke la vi i aport bann tanpèt, le problèm sé ke bonpé parmi nou i travèrs sak tanpèt san zamé konèt ousa li pé artrouv le kalm.`,
`Défoi nou rod partou sek i pouré apèz nout kèr. Pourtan, la vré paix i komans rarman par sek nou trouv a l’extérièr, li komans souvan par sek nou konstrui a l’intérièr. In refuj sé pa in lux, sé in bezoin ke bonpé i dékouv selman kan tout i va mal.`,
`Ou gayn pa touzour choizir sek la vi i aport aou, mé ou pé choizir l’androi ousa out lespri i artourn pou arpran bann fors.`],
zest:[
`Rod in sel landroi ousa ou san aou naturèlman in pé pli kalm (asiz dési in chèz, in ban, in koin da kaz, dann zardin, sou in pié d’boi ect...)`,
`Asiz aou pandan 2 minut, san téléfone, san muzik é san distraksion.`,
`Regard selman otour de ou é respir normalman.`,
`Pui, fini ek fraz-la : “Mi néna déza in landroi pou artrouv amwin avan le tanpèt i ariv.”`,
`Arvien l’androi-la plizièr zour de suit, mèm kan tout va bien.`],
inportan:[
`Nou rekoné rarman la valèr d’in refuj avan le zour ousa nou la vréman bezoin ali.`,
`Sé pou sa ki fo konstrui ali pandan bann périod kalm é pa selman kan tout i ékroul. Bann labitud ke ou kré dan la paix i devien souvan sek i soutien aou pandan bann tanpèt.`],
kestion:[
`Eske ou va réutiliz out refuj avan mèm ke la tanpèt i ariv ?`],
demin:[
`Défoi nou kroi ke nou mank de fors, alor ke nou la sinpleman pas tro de tan a done tout partou.`,
`Tout fatig i rakont pa la mèm istwar. Défoi, sé pa le nonbr de choz ke ou fé i fatig aou, sé sek ou kontini a porté inutilman.`,
`Demin nou sa konprann koman rekonèt sek i vid vréman out lénerzi pou ou gard plis de fors pou sek i kont vréman.`]},

/* ---------------- ZOUR 18 ---------------- */
{n:18, phase:4, title:`KOSA I VID AOU ?`,
intro:[
`Défoi, sé pa sek ou fé ki épuiz aou, sé sek ou kontini a suporté san mèm rann aou kont.`,
`Nou kroi souvan ke nout lénerzi i épuiz kan nou fé “tro”. Pourtan, dé moun i pé viv éxakteman la mèm zourné é finir ek in fatig konplètman diféran. Nout lespri i dépans pa selman de lénerzi a ajir, li dépans osi kan li retien ali, kan li kach, kan li suport é kan li fé sanblan ke tou va bien.`,
`Le pli difisil sé ke fatig-la i ariv souvan dousman. Nou kontini a avansé zisko zour ousa nou di anou : “Mi konpran pi akoz mi lé otan fatigé.”`,
`Zordi, nou sa pa selman rod sek i fé pèrd aou out tan, nou sa aprann a rekonèt sek i pran silansieuzman out lénerzi.`],
verite:[
`Nou lé telman abitué a port bokou dési nout bann zépol ke nou fini par oublié ke nou na le droi de larg azot.`,
`Nou kontini, nou ankès, nou suport, pa touzour paské nou lé for, mé paské nou fini par kroir ke lé normal.`,
`Êtr for sé pa porté touzour plis, défoi êtr for sé rekonèt ke sertin sarz la zamé été fé pou rèst dési nout zépol.`],
zest:[
`A la fin de zourné-la, arpans troi moman ke la plis mark ali.`,
`Pou sak moman, poz aou kestion-la : “Apré moman-la, mi té ek plis lénerzi ou moin d’énerzi ? “`,
`Rod pa pou expliké, obsèrv selman out répons.`,
`Rod in moman ke la vréman vid aou.`,
`Demand aou : “Eske sa i mérit vréman otan d’énerzi ?”`],
zestNote:`Le but isi sé de pa suprim tout sek i fatig aou. Le but sé de rekonèt sek i vid out lénerzi pou anfin arèt done ali otan de pouvoir.`,
inportan:[
`Tout sek i demand out tan i demand pa forséman out lénerzi. Mé tout sek i pran out lénerzi i fini souvan par prann osi out tan.`,
`Défoi nou rod a mié jèr nout zourné, alor ke le vré sanzman i komans par protèz nout lénerzi. Paské kan out lénerzi i diminu, mèm bann zafèr sinp i devien lour.`],
kestion:[
`Kisa ou kosa i mérit ankor vréman out lénerzi ? É kisa ou kosa i resoi ali par abitud ?`],
demin:[
`Défoi nou demand akoz nout lespri lé fatigé, mé nou oubli de armèt an kestion tout sek nou nouri ali avek.`,
`Sak pansé, sak parol, sak lanvironman i lès in tras. A fors nouri nout lespri ek sertin zafer, nou fini souvan par kroir ke zot i fé parti de nou.`,
`Demin, nou sa war akoz sek nou nouri anou zordi i konstrui souvan le moun ke nou devien demin.`]},

/* ---------------- ZOUR 19 ---------------- */
{n:19, phase:4, title:`CHOIZI KOSA OU NOURI`,
intro:[
`Sak zour ou nouri out lespri, la sel kestion sé ek kosa ou nouri ali.`,
`Nou pans souvan ke sé selman nout bann “désizion” ki sanz nout vi. É pourtan, sek nou regard, sek nou ékout, bann moun ke nou frékant é bann mo ke nou répèt dann nout têt, tousala i konstrui dousman le moun ke nou devien. Le sanzman i pous souvan dan le silans, nouri par sek nou lès antré an nou sak zour.`,
`Le pli difisil sé ke out lespri i fé pa touzour la diférans antr sek i fé grandir ali é sek i épuiz ou i anfèrm ali. A fors nourir lé mèm pansé, lé mèm pèr ou lé mèm abitud, nou fini défoi par kroir ke sé sinpleman nout fason d’êtr.`,
`Zordi, nou sa pa selman rod “sek nou manz”, nou sa aprann a choizir osi sek nou done a manzé a nout lespri.`],
verite:[
`Nou fé souvan atansion a sek nou done a nout kor, mé bokou moin a sek nou done a nout lespri.`,
`Pourtan, bann mo ke ou ékout, bann pansé ke ou répèt, bann moun ke ou frékant é bann kontenu ke ou regard, tousala konbiné i fini to ou tar par lès in tras an ou. Défoi nou rod a sanz nout vi, alor ke nout lespri i kontini a nourir ali ek sek i anpèch ali zisteman a grandir.`],
zest:[
`Pandan 2 minut, arpans tout sek ou la gardé, ékouté ou antandu zordi.`,
`Choizi in sel zafer ke la done aou la paix, de l’inspirasion ou de la fors.`,
`Choizi ansuit in sel zafer ke la lès aou pli lour, plis strésé ou pli négatif.`,
`Poz aou kestion-la : “Si mi répèt sa sak zour, kel moun mi risk devnir demin ?”`,
`Fini par choi-la : “Demin, mi lès antré in pé plis sek i fé grandir amwin é in pé moin sek i épuiz amwin.”`],
zestNote:`Sak zafer ou lès antré zordi i partisip déza a la konstruksion de out demin.`,
inportan:[
`Sek ou répèt sak zour i fini touzour par devnir pli for ke sek ou souèt de tanzantan.`,
`Nou pans souvan ke bann gran sanzman i né de bann gran désizion. Pourtan, sé bann labitud répété an silans ki konstrui, ou ki détrui, in vi. Sak choi i paré minuskul dési le moman, mé répété plizièr foi, li sanz dousman la direksion de out semin.`],
kestion:[
`Si ou kontini éxakteman lé mèm abitud pandan in an, eske ou yèmré le moun ke ou deviendré ?`],
demin:[
`Défoi, le pli gran konba sé pa kont la vi, sé kont la fason don nou trèt anou mèm.`,
`Nou pas bonpé tan a rod la paix otour de nou, mé rarman a konstruir ali a l’intérièr.`,
`Demin, nou sa dékouv akoz fèr la paix ek nou mèm lé peut êtr le pli bo kado ke ou pé ofrir a out lavnir.`]},

/* ---------------- ZOUR 20 ---------------- */
{n:20, phase:4, title:`FÉ LA PAIX EK OU MÈM`,
intro:[
`Le pli lon konba dan nout vi sé souvan sek nou mèn kont nou mèm.`,
`Défoi, le pli dir sé pa sek lé zot i pans de nou, sé sek nou kontini kroir dési nou mèm. A fors viv kont nou mèm, nou oubli ke la paix i komans rarman kan tout i devien “parfé”. Li komans souvan le zour ousa nou arèt trèt anou kom in lénmi.`,
`Fé la paix ek nou mèm sé pa oublié le pasé, sé arèt done ali le pouvoir de désid de sak nouvo zour. Nou pé rekonèt nout bann zérèr, vouloir grandir é kontinié avansé san pas nout vi a punir anou.`,
`Zordi, nou sa pa aprann a devnir in not moun, nou sa sinpleman aprann a regard le moun ke nou lé déza ek in pé plis de dousèr, de respé é de vérité.`],
verite:[
`Apré in lérèr par exanp, nou rezou la sèn dan nout têt, nou reproch anou é nou kondane anou. Pourtan, okin prèv de kulpabilité la zamé sanz le pasé, li sanz selman la fason ke nou viv le prézan.`,
`Le vré pardon sé de savoir dir anou : “Mi refuz ke lérèr-la i désid ankor de mon vi.” Tank ou kontini a punir aou, out pasé i gayn ankor. Le zour ousa ou désid aprann de out bann lérèr, sé ou ki komans gaynié.`],
zest:[
`Pans a in lérèr ke ou ariv touzour pa a pardone aou.`,
`Pronons ali dan out têt in sel foi.`,
`Pui, ajout imédiatman fraz-la : “Oui, sa la arivé. Mé sa i rakont pa tout mon listwar.”`,
`Répèt fraz-la 3 foi.`,
`Anfin, demand aou : “Kosa mi vé i grandi an mwin : la kulpabilité ou bien la leson ?”`],
inportan:[
`Persone i mérit de pas tout son vi a payé pou in moun ke li lé pi. Nou sanz, nou aprann, nou grandi. Pourtan, bonpé i kontini a gard azot ek le mèm regar ke zot navé dan “lansien zot”.`,
`Le pasé i pé éxpliké kisa ou lété, mé li gaynra zamé le droi de désid kisa ou sera dan out lavnir.`,
`Fèr la paix ek ou mèm sé pa éfas “out ièr”, sé plito arèt lès ali vol “out zordi”.`],
kestion:[
`Si ou té gayn anfin arèt punir aou, kosa ou ozré arkomansé dé demin ?`],
demin:[
`Demin, sé pa in nouvo sapit ki atann aou, sé in nouvo regar dési le moun ke ou la ni pandan sé 21 zour-la.`,
`Nou va pa aprann in nouvo leson, nou va sinpleman regard tout le semin ke ou la dézà parkouru é sek i komans mintnan, in foi ke ou fèrm livré-la.`,
`Paské le pli bo sanzman i komans pa kan ou tèrmine livré-la, li komans kan ou désid anfin de viv ek sek li la apri aou.`]},

/* ---------------- ZOUR 21 — LA LETTRE ---------------- */
{n:21, phase:4, title:`KONTINIÉ`, letter:[
`Si ou li ankor bann lign-la, sé ke ou la choizi alé zisko bou. Rienk pou sa ou pé déza êtr fièr de ou.`,
`Pandan 21 zour, nou la koz du prézan, de bann lérèr, de bann konparézon é tout bann batay ke persone i war. Pourtan, okin de bann paz-la navé pou but de fèr de ou in moun parfé. Le but lété sinpleman de fèr rapèl aou ke, mèm dan bann zour difisil, ou na touzour le pouvoir de choizir la prochèn étap.`,
`Riskap ke demin ou va oubli sertin paz, riskap ke sertin labitud va reni, mé si tousala i arvien di aou bien in sel zafer : tonbé i éfas zamé tou le semin ke ou la fini parkourir.`,
`Le vré sanzman lé zamé sek ou resan pandan out lektir, sé plito sek ou dékouv dé troi semèn pli tar kan, san mèm rann aou kont, ou komans azir otreman.`,
`Astèr, refèrm livré-la ek in sel promès, la promès de kontinié.`,
`Kontinié a aprann. Kontinié respiré. Kontinié a poz out bann limit. Kontinié choizir sek i nouri out lespri. Kontinié a fèr la paix ek ou mèm. Kontinié, mèm dousman. Paské, sé pa la vitès ki sanz in vi, sé la direksion ke ou choizi gardé.`,
`É si in zour ou dout ankor, arvien lir in paz, pa pou trouv in répons tou d’suit mé pou rapèl aou ke tout sek ou rod i komans déza grandir an ou.`]}
  ];

  return res.status(200).json({ ok: true, days: LOCKED_DAYS });
}


