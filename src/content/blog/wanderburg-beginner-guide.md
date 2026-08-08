---
title: "『Wanderburg』初心者向けガイド｜装備一覧・ビルドの基本・序盤のコツ【体験版】"
description: "『Wanderburg』体験版の初心者向けガイド。Captain・Crew・Module・Artifactの装備一覧、AutomaticとAbility、レア度、ビルドの考え方、序盤やボス戦で意識したいコツをまとめる。"
pubDate: 2026-08-08
updatedDate: 2026-08-09
heroImage: '../../assets/images/wanderburg-guide/hero.svg'
category: "Games"
tags: ["Wanderburg", "初心者ガイド", "装備一覧", "ローグライト", "Steam"]
author: "taha"
draft: false
---

『Wanderburg（ワンダーバーグ）』の体験版を何度か遊び、アンロック画面や強化候補もある程度確認できたので、**初心者向けガイドとして、装備の種類やビルドの基本、序盤で意識したいこと**をまとめる。

本作は単純に武器を増やすだけではなく、**Captain、Crew、Module、Artifactを組み合わせ、ラン中はAutomaticやAbilityを強化していく**ゲームである。

最初は用語が少し分かりにくいが、仕組みが見えてくるとかなり遊びやすい。

この記事では筆者がDemo 1.5で実際に確認した内容を中心に、海外コミュニティで見かけたビルド例も分けて紹介する。

> ※2026年8月9日時点の体験版（Demo 1.5）をもとにしている。正式版や今後のアップデートで性能・名称・バランスが変わる可能性がある。

ゲーム自体の紹介は[『Wanderburg』はどんなゲーム？](/blog/wanderburg-overview/)、実際に遊んだ感想は[『Wanderburg』体験版プレイ感想](/blog/wanderburg-demo-impressions/)でまとめている。

## まずは序盤で城を育てる

序盤は強い敵だけを探すより、羊、兵士、村、敵の小型要塞、「？」イベントなどを拾いながら進むのが分かりやすい。

公式でも、村や羊の群れ、小さな要塞などを取り込んで城を成長させることが基本ループとして説明されている。

実際に遊んだ範囲でもフィールドのイベント密度はかなり高く、**移動→戦闘→強化→次のイベント**をテンポよく繰り返せる。

[『Wanderburg Demo』Steamページ](https://store.steampowered.com/app/4268810/Wanderburg_Demo/)

## 装備はカテゴリごとに役割が違う

ラン開始前の画面には、Vehicle、Captain、Crew、Module、Artifactが並んでいる。

![ラン開始前のビルド選択画面](../../assets/images/wanderburg-play/loadout.png)

*筆者撮影。Demo 1.5では複数カテゴリにかなりのアンロック枠が用意されている。*

Vehicleについては今回の動画では名称・効果まで確認できなかったため、分かったものだけを無理に埋めず、以下はCaptain・Crew・Module・Artifactに分けて掲載する。

### Captain一覧

Captainは、城全体の性能や操作感に大きな特徴を付ける枠である。

| Captain | 効果・特徴 | デメリット |
|---|---|---|
| Norbert the Normal | 効果表示なし。標準的なCaptain | 特になし |
| Racer Ruth | Boost中のSpeed +50% | 通常走行Speed -10% |
| The Count | UnitをConsumeすると回復 | Health Boxが出現しない |
| Tankbert | Vehicle撃破時に最大HPが増加 | Nitro回復速度 -50% |
| Lumberjack | TreeをConsumeするとNitroを獲得 | Nitroの自然回復がかなり遅くなる |
| Time Witch | ゲーム全体が2倍速になる | ゲーム全体が2倍速になる |
| Dieter the Drunk | Damage +50% | 操作がふらつく |

Time Witchはプラスとマイナスの両方に「ゲームが2倍速」と表示されている。完全に好みが分かれそうなCaptainである。

Dieter the Drunkについては、開発元も2026年2月のアップデートで追加Captainとして紹介している。

### Crew一覧

Crewは城に乗り込み、自動攻撃や回復、Gold獲得などを担当する。

| Crew | 効果 |
|---|---|
| Archers | 近くの敵へ定期的に矢を撃つ |
| Carpenters | 時間経過で少しずつHPを回復する |
| Merchants | 時間経過でGoldを生成する |

初期状態ではArchersがかなり分かりやすい。攻撃を自動で任せられるため、プレイヤーは城の移動やAbilityの使用に集中しやすい。

一方、Carpentersは耐久寄り、Merchantsは長いランほどGold面で恩恵を受けやすそうで、Crewだけでもビルドの方向性が変わる。

### Module一覧

Moduleは城そのものに取り付ける兵装・機能である。

| Module | 基本効果 | 向いていそうな役割 |
|---|---|---|
| Side Cannons | 城の側面からCannonballを撃つ | 遠距離・砲撃 |
| Front Ram | 前方の敵へ大ダメージを与え、押し飛ばす | 近接・突撃 |
| Top Mortar | 指定エリアへCannonballをまとめて撃つ | 遠距離・範囲 |
| Mine Layer | Vehicleの後方へMineを落とす | 設置・逃げ撃ち |
| Side Barracks | 戦ってくれるTroopを送り出す | 召喚 |
| Dash | 前方へ一気にBoostする | 機動力・突撃 |
| Teleporter | Vehicle前方の位置へTeleportする | 回避・位置調整 |
| Fire Wizard | 近くの敵へFireを撃つ | 魔法・近距離範囲 |

ラン開始前の表記は「Side Cannons」だが、ラン中の強化カードでは「CANNON」と表示される場面も確認できた。

## ModuleはAutomaticとAbilityを分けて考える

WanderburgのModuleで特に覚えておきたいのが、**AutomaticとAbilityが別物**という点である。

![Automatic・Ability・Cooldownのアップグレード](../../assets/images/wanderburg-play/upgrade.png)

*筆者撮影。CannonにはAbility側とAutomatic側があり、Cooldown強化では両方の発動間隔が短くなっている。*

ざっくり整理すると、次のような考え方でよさそうだ。

- **Automatic**：自動で繰り返し発動する攻撃・効果
- **Ability**：任意のタイミングで使うアクティブ側の効果
- **Cooldown**：AbilityやAutomaticの再発動間隔を短くする強化

実際のCannon強化では、Ability Damageを伸ばす候補とは別に、Automaticの発射間隔とAbilityの再使用時間をまとめて短縮するCooldown候補も出現した。

つまり同じModuleを使っていても、**自動攻撃を伸ばすか、Abilityを主力にするかでビルドが変わる**。

筆者が使ったFront Ramも、Abilityの突撃を活かすことでボスへ一気にダメージを出せた。

なお、すべてのModuleが完全に同じAutomatic／Ability構成とは限らない。ここは確認できた範囲から随時更新する予定である。

## アップグレードはレア度にも注目

3択アップグレードでは効果だけでなく、カード下部の**common / uncommon / rare**にも注目したい。

筆者が確認した例では、同じCannonでもcommonとrareが同時に並ぶことがあり、rare側ではDamage増加に加えてChargesも増える候補が出た。

ただし、**rareなら何でも取ればいいわけではない**。

Front Ramへ寄せている最中にCannonのrareが出ても、今の主力を伸ばせる候補があるならそちらを優先したほうがビルドはまとまりやすい。

Steamコミュニティでも「レア度の表示が少し分かりにくい」という意見が出ており、確かに戦闘中はカード下部の文字を見落としやすい。

## Artifact一覧

Artifactはラン中にArtifact Chestから3択で入手できる。

体験版のチュートリアルでも、Chestを取ると3つのArtifact候補から1つを選ぶ仕組みになっている。

筆者の動画・スクリーンショットで確認できたものは以下の通りである。

| Artifact | 効果 |
|---|---|
| Last Amplifier | 直前に取得したArtifactの効果を2倍にする |
| Golden Bow | Arrow Damage +15% |
| Iron Sword | Melee Damage +10% |
| Cauldron | UnitをConsumeするとMagic AbilityのCooldownが進む |
| Iron Bullet | Cannonball Damage +15% |
| Electric Arrow | 100本目ごとのArrowにChain Lightningが付く |
| Overtime Bonus | Crewの仕事速度 +10% |
| Professional Tools | Repairで得る回復量 +20% |
| Recycling Bin | 獲得Gold +5% |
| Emergency Boost | HP20%未満でSpeed +20% |
| Shepherd's Staff | SheepをConsumeするたび追加で1 Gold |
| Quick Reload | Boost中、Cooldownが5%速く進む |
| Catalyst | Boost時のNitro消費 -20% |
| Phoenix Feather | 死亡時に一度だけ死亡を回避し、HP30%で復帰 |
| Magma Core | Cannonballが地面に当たるとFire Craterを残す |
| Stiletto | HP満タンの敵へのMelee Damage増加 |
| Work Contract | FarmerをConsumeするとFriendly Sheepriderを1体得る |
| ARTIFACE DICE | Artifactの3択をRerollできるようになる |
| Repair Wrench | Upgrade候補を捨てる代わりにHP25%回復を選べる |
| Upgrade Dice | Module Upgradeの3択をRerollできるようになる |

「ARTIFACE DICE」はDemo 1.5のゲーム内表記そのままである。

Artifactは単純な火力アップだけではなく、回復、Gold、Nitro、Rerollなどかなり種類が多い。

初心者のうちは、**今の主力を伸ばすArtifactを優先する**だけでも選びやすくなる。

たとえばCannon中心ならIron BulletやMagma Core、Melee中心ならIron SwordやStiletto、Boostを多用するならCatalystやQuick Reloadといった具合である。

## 筆者おすすめ：Speed＋Front Ramの近接特化

筆者が実際に試して特に手応えがあったのが、**Speed＋Front Ram**へ寄せる構成である。

Front Ramは前方の敵へ大きなダメージを与え、Abilityでは勢いよく突撃できる。

Speed系も伸ばし、敵へ城そのものを叩き込む構成にしたところ、2体目のボスは**Ramの突撃2回ほどで倒せた**。

もちろん1ランだけで「最強ビルド」と断定するつもりはないが、少なくとも特化ビルドがしっかり機能することは確認できた。

![Speed＋Front Ramビルドのリザルト](../../assets/images/wanderburg-play/end-run.png)

*筆者撮影。10分53秒生存、Upgrade Level 24、ボス2体を撃破したラン。*

## 4体目のボス撃破でDemoクリア

その後さらにランを進め、筆者のプレイでは**4体目のボスを倒したところで「Game Won!」となり、Demo 1.5をクリアできた**。

このクリアランで特に手応えがあったのは**Top Mortar**である。範囲へまとめて砲撃できるため扱いやすく、筆者の体感では最後までかなり頼れる主力になった。

ただし、これだけで「Mortarが最強」と断定するつもりはない。前述のSpeed＋Front Ramでもボスへ大きなダメージを出せたので、**近接ならRam、遠距離・範囲ならMortarのように、使いやすいModuleへしっかり寄せる**のが分かりやすいと感じた。

クリア画面で確認できた記録は以下の通りである。

- Time Survived：19分31秒
- Gold Collected：8,750
- Upgrade Level：48
- Castle Size：4
- Vehicles Destroyed：192
- Units Consumed：844

画面には現在所持Goldとして9,294も表示されているが、ラン中に集めたGoldは「Gold Collected」の8,750である。

## 海外ではMines＋Speed特化も人気

ここからは筆者のプレイ結果ではなく、海外コミュニティのビルド例である。

Steamコミュニティでは、**Mines＋Speed**を推す投稿があり、強化優先度として「Mines Ability → Mines Cooldown → Mines passive → Ram Cooldown」が挙げられている。

また、開始構成としてThe Count系の回復CaptainとMerchantsを組み合わせる案も出ている。

この投稿を見る限りでも、Wanderburgは武器を広く取るより、**主力Moduleを決めてAutomatic／Ability／Cooldownを集中的に伸ばす**ほうが強みを出しやすそうである。

[Wanderburg Steamコミュニティ](https://steamcommunity.com/app/3624140/)

## ボス戦では早めに旋回して向きを作る

城の操作方法自体はシンプルだが、旋回には時間がかかる。

通常の敵なら多少強引に進めるが、ボスや大型要塞ではこの重さがかなり重要になる。

敵の砲台がこちらを向いてから慌てて回避するより、**砲台の向きを確認し、少し先を予想して早めに旋回する**ほうが安定した。

Front Ramを使う場合も同じである。

いったん距離を取り、城の正面をボスへ合わせてからAbilityで突撃するほうが当てやすい。

大きくて不安定な城を無理やり細かく操作するのではなく、**先に進行方向を作っておく**のがコツだと感じた。

## Health Boxはボス前に覚えておきたい

体験版のチュートリアルでは、Health Boxの回復量も明記されている。

- 大きなHealth Box：最大HPの25%回復
- 小さなHealth Box：最大HPの10%回復

ボス戦までに細かな被弾を重ねるとかなり苦しくなるため、見つけたら残りHPを見ながら回収したい。

ただしThe Countを選んでいる場合はHealth Boxが出現しない代わりに、UnitをConsumeして回復する構成になる。

Captainによって回復方法自体が変わるのも面白いところである。

## 初心者がまず意識したいこと

最初から全装備の相性を覚える必要はない。

筆者が現時点で意識しているのは、次のあたりである。

1. 序盤は羊・村・敵・イベントを回って成長を止めない
2. 3択では効果だけでなくcommon / uncommon / rareも確認する
3. 主力Moduleを決め、Automatic・Ability・Cooldownを寄せる
4. Artifactは今のビルドと噛み合うものを優先する
5. ボス戦では早めに旋回し、城の向きを先に作る
6. Health Boxの回復量を覚えて無駄な被弾を減らす

体験版の時点でもCaptain、Crew、Module、Artifactの組み合わせはかなり多い。

まだ未アンロックの枠もかなり残っているので、装備が増えたらこの記事も追記していく予定である。

## 関連記事

- [『Wanderburg』はどんなゲーム？動く城を巨大化させるサバイバー系ローグライト](/blog/wanderburg-overview/)
- [『Wanderburg』体験版プレイ感想｜戦闘テンポが良く、動く城の操作も面白い](/blog/wanderburg-demo-impressions/)
- [『Wanderburg』Steamストアページ](https://store.steampowered.com/app/3624140/Wanderburg/)
- [『Wanderburg Demo』Steamページ](https://store.steampowered.com/app/4268810/Wanderburg_Demo/)
