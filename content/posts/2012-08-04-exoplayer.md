---
template: post
title: استخدام ExoPlayer لتشغيل الوسائط و قوائم التشغيل والمزيد من المزايا
slug: exoplayer-usage-with-example
socialImage: /media/Music_player_app_on_smartphone.jpg
draft: false
date: 2021-08-06T15:49:16.519Z
description: يوفر ExoPlayer بديل لتشغل ملفات الفيديو والصوتيات المحلية والمتوفرة عبر الانترنت 
category: اندرويد
tags: [اندرويد,برمجة,exoplayer]
---

![](/media/Music_player_app_on_smartphone.jpg)

استخدام exoplayer لتشغيل الوسائط و قوائم التشغيل



# ما هو ExoPlayer?

هي مكتبة مشغل وسائط مفتوحة المصدر بديل ل ميديا, يوفر بديل لتشغل ملفات الفيديو والصوتيات المحلية والمتوفرة عبر الانترنت .

على عكس الميديا الذي هو مكتبة على مستوى النظام الامر الذي يجعل التحديثات الجديدة تتطلب تحديث كامل لنسخة النظام, فان اكسو هو مكتبة منفصلة يمكن تحميل التحديثات عن طريق المتجر.

وامر اخر يجعلك تريد ان تستخدم اكسو هو انه يدعم مجموعة كبيرة الاجهزة بمختلف النسخ على عكس ميديا حيث يمكن لاي شخص تعديل السورس كود واضافتها للهاتف مما يزيد من مشاكل التطبيق المستقبلية وصعوبة حلها

يوفر اكسو خواص اضافة ايضا ليست موجود في ميديا مثل:

-  قوائم التشغيل playlist
-  دعم الكثير من الهواتف
-  دعم ادارة الحقوق الرقمية DRM
-  DASH
-  RTSP
-  استرجاع معلومات عن ملف الوسائط Metadata
-  SmoothStreaming
-  اضافة ملف ترجمة
-  HLS
-  اضافة اعلانات , مثل اعلانات يوتيوب في نسخة الهواتف
-  تحويل الوسائط مثل:
   - تغير صيغة ملف الوسائط مثل من mp3 الى wav
   - مسح المسارات: مثل مسح الصوت من فيديو او العكس

بعد هذه المقدمة البسيط يمكن ان نبدا استخدام المكتبة في مثال.

# كيف اضيف المكتبة الى مشروعي؟

يمكن اضافة المكتبة بطريقتين:

1. اضافة المكتبة كاملة بجميع الخواص كمكتبة كاملة
2. اضافة المكتبة التى الدوال الاساسية core ثم بعد ذلك اضافة الخواص كل على حدة

لتبسيط الامر سوف نستخدم الطريق ١ , يمكنك قراءة المزيد من [هنا](https://exoplayer.dev/shrinking.html) 

قم باضافة هذا السطر الى `build.gradle` 
<div dir="ltr">

```groovy
implementation 'com.google.android.exoplayer:exoplayer:2٫+'
```
</div>

قم بالتاكد من استخدام اخر نسخة.

# مثال

سوف اقوم ببناء تطبيق صغير يعمل على تشغيل عدة سور من القران

البيانات موجودة [على](https://api.alquran.cloud/v1/surah) وسور القران موجودة [على](https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/)



<u>لن اقوم باظهار اي كود ليس له علاقة ب exoplayer, الكود متوفر على [github](https://github.com/m7mdra/ExoplayerDemo) اذا اردت المزيد من التفاصيل</u> 

نبدا بتعريف متغيرالمشغل
<div dir="ltr">

```kotlin
private lateinit var player: ExoPlayer
```
</div>

بعدها نقوم بتعريف المتغير

<div dir="ltr">

```kotlin
player = createExoPlayerInstance()
```

```kotlin
private fun createExoPlayerInstance(): SimpleExoPlayer {
    return SimpleExoPlayer.Builder(this)
        .build()
}
```
</div>

باستخدام `SimpleExoPlayer` فاننا لن نحتاج الى تعريف عدة خواص لانه هذا الكلاس مصمم لاغلب انواع الاستخدامات وكل الخواص تاتي بشكل افتراضي



الان سوف نقوم باضافة قائمة التشغيل 
<div dir="ltr">

```kotlin
    private fun createPlaylist() {
        val playlist = surahList.map { surah ->
            MediaItem.Builder()
                .setUri(surah.audio)
                .setTag(surah)
                .build()
        }
        player.addMediaItems(playlist)
        player.prepare()
    }
```
</div>

سوف اشرح هذا الجزء بالتفصيل:



اول نقوم بعمل `map` للبيانات وتحويلها الى كائن من نوع `MediaItem`
<div dir="ltr">

```kotlin
 val playlist = surahList.map { surah ->
        MediaItem.Builder()
            .setUri(surah.audio)
            .setTag(surah)
            .build()
    }

```
</div>

نقوم باضافتها الى المشغل
<div dir="ltr">

```  kotlin
player.addMediaItems(playlist)
```
</div>

بعدها ننادي الدالة
<div dir="ltr">

```  kotlin
player.prepare()
```
</div>

هذه الدالة تقوم بتجهز وقائمة التشغيل والبدء في معالجة الصوتيات

لمعرفة حالة المشغل ما اذا كان حصل خطأ او انتهى من التحميل او انتهى من الملف الاول وسوف ينتقل الى الثاني او غيره نحتاج الى الاستماع الى عده احداث
<div dir="ltr">

```kotlin
player.addListener(listener)
```
</div>

نقوم بمنادة `Player.Listener` الدالة ونمرر المتغير  وهو `Interface` يتيح لنا عدة دوال :

مثل

- `onIsPlayingChanged` يتم منادتها اذا توقف او بدء التشغيل
- `onMediaItemTransition` يتم المنادة اذا انتهى المسار الصوتي وانتقل الى المسار التالي
`onPlaybackStateChanged` تتم المناداة اذا تغير حالة المشغل وهي واحد من اربع حالات:
  - `Player.STATE_BUFFERING`تحدث هذه الحالة عادةً عند الحاجة إلى تحميل المزيد من البيانات.
  - `Player.STATE_ENDED` انتهى من تشغيل الوسائط
  - `Player.STATE_IDLE` المشغل ليس لديه أي وسائط
  - `Player.STATE_READY`المشغل جاهز للبدء
- وغيرها الكثير

# البدء في التشغيل وباقي التحكمات

يمكن بدء التشغيل بطريقتين 

الاولى:

منادة الدالة
<div dir="ltr">

```kotlin
player.playWhenReady = true
```
</div>

التي بدورها تعطي امرا للمشغل بالبدء من تلقاء من نفسه اذا توفرت البيانات

<div dir="ltr">

```kotlin
player.release()
```
</div>

يستخدم لايقاف المشغل وتحرير اي كائن له علاقة بالمشغل
<div dir="ltr">

```kotlin
player.pause()
```
</div>

يستخدم لايقاف التشغيل ويمكن استئناف التشغل بمنادة الامر `play`
<div dir="ltr">

```kotlin
player.stop()
```
</div>

يوقف التشغيل بدون إعادة ضبط المشغل. استخدم `pause()` بدلاً من هذه الطريقة إذا كانت النية هي إيقاف التشغيل مؤقتًا.

```kotlin
seekTo(int windowIndex, long positionMs)
```

تستخدم للانتقال بين المسارات مع تحديد الزمن, **يجب استخدامها بحذر** لان المشغل سوف يرسل خطأ اذا تم تمرير رقم مسار خاطئ او غير موجود
<div dir="ltr">

```kotlin
seekTo(long positionMs)
```
</div>

تستخدم للانتقال الى زمن معين في نفس المسار الحالي


كانت هذه هي التحكمات الاساسية 


نقوم الان بشتغيل المثال:
<div dir="center">
 <video width="640" height="480" controls >
  <source src="/media/output.mp4" type="video/mp4">
</video> 
</div>

كانت هذه مقدمة بسيطة للمكتبة , في مواضيع مستقبلية سوف اقوم بشرح مواضيع اضافة.

<hr>