---
template: post
title: تشغيل ملفات الفيديو باستخدام ExoPlayer
slug: exoplayer-usage-with-example-2
socialImage: /media/Music_player_app_on_smartphone.jpg
draft: false
date: 2021-08-12T15:49:16.519Z
description: تشغيل الفيديوهات وعرضها والتفاعل معها
category: اندرويد
tags: [اندرويد,برمجة,exoplayer]
---
اذا كانت هذه اول مرة لك في استخدام اكسو , قم بمراجعة المقال [السابق](/posts/exoplayer-usage-with-example)



السلام عليكم





في المقال السابق قمت بشرح طريقة الاستخدام الاسياسية ل اكسو مع عمل مثال صغير, وبناء على ذلك المقال سوف اقوم اليوم بشرح كيفية تشغيل ملفات فيديو من عدة انوع.



سوف بالبدء باضافة المكتبة:

<div dir="ltr">

```groovy
implementation 'com.google.android.exoplayer:exoplayer:2.15.0'
```
</div>


او يمكننا استخدام
<div dir="ltr">

```groovy
implementation 'com.google.android.exoplayer:exoplayer-ui:2.15.0'
implementation 'com.google.android.exoplayer:exoplayer-core:2.15.0'
```

</div>

اذا لم ترد باستخدام باقي خواص المكتبة ميزة اضافية ايضا هي صغر حجم المكتبة بهذه الطريقة



تاكد من اضافة صلاحية الانترنت الى `AndroidManifest.xml` لاننا سوف نقوم بتشغل ملف على الانترنت


<div dir="ltr">

```xml
<uses-permission android:name="android.permission.INTERNET"/>
```
</div>

### واجهة المستخدم

![](/media/overriding-layoutfiles.png)



سوف نقوم باستخدام `View` جاهز من المكتبة تحتوى على الخواص الاساسية
<div dir="ltr">

```xml
<com.google.android.exoplayer2.ui.PlayerView
    android:id="@+id/playerView"
    android:layout_width="0dp"
    android:layout_height="0dp"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toTopOf="parent" />
```

</div>


سوف يقوم `PlayerView` بعرض الفيديو وايضا عرض تحكمات من الفيديو باستخدام `PlayerControlView`


### الكود

سوف نقوم بانشاء متغير المشغل 

<div dir="ltr">

```kotlin
val player = SimpleExoPlayer.Builder(this)
    .build()
```
</div>

بعدها نحتاج ان نمرر المشغل الى الواجهة

<div dir="ltr">

```kotlin
val playerView = findViewById<PlayerView>(R.id.playerView)
playerView.setPlayer(player)
```
</div>

هذا كل شيئ.



الان نحتاج الى اضافة ملف التشغيل

<div dir="ltr">

```kotlin
player.addMediaItem(MediaItem.fromUri("URL"))
```
</div>

الخطوة الاخيرة 

هي تجهيز المشغل والبدء في التشغيل

<div dir="ltr">

```kotlin
player.prepare()
player.playWhenReady = true
```
</div>

هذه كل الكود المطلوب لتشغيل الفيديو

<div dir="ltr">

```kotlin
val player = SimpleExoPlayer.Builder(this)
    .build()
val playerView = findViewById<PlayerView>(R.id.playerView)
playerView.player = player
player.addMediaItem(MediaItem.fromUri("https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4"))
player.prepare()
player.playWhenReady = true
```

</div>


الان سوف نقوم بتشغيل المشروع

<div dir="center">
 <video width="640" height="480" controls >
  <source src="/media/output-video-exoplayer.mp4" type="video/mp4">
</video> 
</div>

###  خواص اضافية:

هنالك خواص اضافية تم  بعض تعطيلها ولكن يمكنك تفعليها مثل

- `show_shuffle_button`  اظهار خاصية خلط قائمة التشغيل , بمعنى انه لا يتم تشغيل قائمة التشغيل بالتوالي ولكن عشوائياً
-  `show_subtitle_button` اظهار زر تفعيل الترجمة , اذا تم اضافة ملف الترجمة 
- `show_fastforward_button` اظهار زر تقديم التشغيل 
- `show_rewind_button` اظهار زر ارجاع التشغيل 

وخواص اخرى .



### ما بعد ال `PlayerView` 

اذا اردت تغيير شكل المشغل فان المكتبة توفر شكلين من المشغلات 

<div dir="center">


|                      StylePlayerView                      |                    PlayerView                     |
| :-------------------------------------------------------: | :-----------------------------------------------: |
| ```com.google.android.exoplayer2.ui.StyledPlayerView  ``` | ```com.google.android.exoplayer2.ui.PlayerView``` |
|           ![](/media/exoplayer_Style_view.png)            |          ![](/media/exoplayer_view.png)           |

 طريقة الاستخدام متشابه تماما, اما الشكل العام فيه بعض الاختلافات.



ماذا ان كانت كل هذه الاشكال لا تناسبك ؟ 



الحل بسيط جدا , لدينا امكانية تعريف شكل مخصص

1- سوف نقوم اولا بتصميم شكل الواجهة المخصصة

<div dir="ltr">

```xml
<?xml version="1.0" encoding="utf-8"?>
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">


        <ImageButton android:id="@id/exo_play"
            android:layout_width="100dp"
            android:layout_height="100dp"
            android:layout_gravity="center"
            android:background="#CC000000"
            style="@style/ExoMediaButton.Play"/>

        <ImageButton android:id="@id/exo_pause"
            android:layout_width="100dp"
            android:layout_height="100dp"
            android:layout_gravity="center"
            android:background="#CC000000"
            style="@style/ExoMediaButton.Pause"/>

</FrameLayout>
```

</div>

![](/media/exoplayer_custom_player_view_layout.png)

يحتوى على زرين فقط , تشغيل و ايقاف

لاحظ اننا قمنا باستخدام معرف `@id/exo_play` بدون علامة  `+` وهذا يعني اننا سوف نستخدم معرفات موجودة مسبقا معرفة من المكتبة , بهذه الطريقة يستطيع المشغل ايجاد الازرار

2- تمرير اسم الواجهة لل `PlayerView` او `StyledPlayerView` في  `controller_layout_id`

<div dir="ltr">

   ```xml
   <com.google.android.exoplayer2.ui.PlayerView
       android:id="@+id/playerView"
       android:layout_width="0dp"
       android:layout_height="0dp"
       app:controller_layout_id="@layout/custom_player_view"
        ...
        ...
   />
   ```
</div>


   وبذلك نكون انتهينا

   | الصورة الاولى                          | الصورة الثانية                         |
   | -------------------------------------- | -------------------------------------- |
   | ![](/media/exoplayer_custom_view1.png) | ![](/media/exoplayer_custom_view2.png) |



تذكر دائما عند الانتهاء من استخدام المشغل ان تقوم بتسريح المشغل حتى لا يحصل لديك تسريب في الذاكرة

<div dir="ltr">

```kotlin
player.release()
```
</div>

الكود متوفر [هنا](https://github.com/m7mdra/ExoplayerDemoVideo) سوف تجد شرح الطرق الثلاث مع اضافات صغيرة

يمكنك استكمال القراءة على موقع [المكتبة](https://exoplayer.dev/)



<hr>

