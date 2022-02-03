---
template: post
title:  Exoplayer والتشغيل في الخلفية
slug: exoplayer-playing-in-background
socialImage: /media/compaq-323012-001-ram-memory-memory-compaq-compaq-deskpro-storage.jpg
draft: false
date: 2021-15-12T15:49:16.519Z
description: تعرف على كيف يمكمنك ان تجعل مشغل الصوتيات يعمل حتى عند توقف استخدام التطبيق او في الخلفية
category: برمجة
tags: [اندرويد,برمجة]
---



السلام عليكم

قد تكون لاحظت في بعض المرات ان المشغل الاساسي في هاتفك لا يتوقف اذا قمت بازالة التطبيق من قائمة التطبيقات الحالية او عند الضغظ على زر الرجوع, قد تكون حاولت ان تفعل نفس الشيئ ولكن انتهى بك الامر بايقاف التشغيل تلقائيا مع  سحب التطبيق الى اليمين *اي ازالته من القائمة* او الضغط على زر الرجوع . لماذا قد يحصل هذا؟

![https://i.stack.imgur.com/HFCji.png](https://i.stack.imgur.com/HFCji.png)

لتبسط الامور ولكي لا اغوص عميقاً

في عالم الاندرويد هناك اربع عناصر اساسية لبناء التطبيق:

- Activities 

  تستخدم لبناء الواجهات التى يراها المستخدم وهي نقطة الوصل بين الهاتف المستخدم

- Services

  يستخدم هذا العنصر لجعل التطبيق يعمل في الخلفية وغالبا ما يستخدم للعمليات الطويلة التى لا تحتاج تدخل المستخدم مثل :

  تشغيل الصوتيات , تحميل ملفات

- Broadcast receivers

  يستخدم هذا العنصر لارسال احداث Events الى باقي التطبيقات واجزاء النظام , كمثال : اذا اردت ان تستمع الى حدث تغيير في نوع الشبكة الحالية اذا كانت WiFi او انترنت من شريحة الهاتف وغيره الكثير من الاحداث . هذه [قائمة](https://developer.android.com/reference/android/content/Intent#constants_1) بجميع الاحداث في اندرويد

- Content providers

  يتيح هذه العنصر الوصول للبيانات اذا كانت ملفات خاصة بالتطبيق او بيانات خاصة بتطبيق اخر او بيانات النظام مثال: قراءة سجل الاتصال, جهات الاتصال وغيره

لتفاصيل [اكثر](https://developer.android.com/guide/components/fundamentals#Components)

بصورة عامة السبب في ان المشغل يتوقف عن العمل لان حياة الكائن مرتبطة بحياة ال`Activity` واذا تم اغلاقه يتم اغلاق اي عملية اخرى مرتبطه به

<div dir="center">
 <video width="640" height="480" controls >
  <source src="/media/exoplayer-stop.mp4" type="video/mp4">
</video> 
</div>

> في [تدوينة](/posts/exoplayer-usage-with-example) سابقة قمت بانشاء هذه السيناريو, لاحظ عند اغلاق التطبيق فان المشغل يتوقف عن العمل



**والحل المتاح حاليا هي استخدام `Service` يقوم بكل شيئ وال`Activity` يقوم فقط بالتحكم في `Service` وامكانية ايقافها**

في هذا المثال سوف استعين بالمشروع السابق في انشاء مشغل يعمل في الخلفية في كل الحالات وايضا اظهار اشعار للتحكم في المشغل مثل ايقاف, التالي, السابق الخ, وايضا سوف تقوم `Service` بتوفير بيانات مثل حالة التشغيل , المسار المشغل حاليا, وغيره من المثال السابق.

##### انشاء `Service` :



```kotlin
class PlayerService : Service() {

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        return super.onStartCommand(intent, flags, startId)
    }
}
```

وايضا نقوم باضافته الى `AndroidManifest.xml` داخل وسم `<application>`



```xml
<application
						..
             ..
             >
    
    <service
        android:name=".PlayerService"
        android:foregroundServiceType="mediaPlayback"
        />
</application>
```

يحتوى الوسم `<service>` على الاسم ونوعها

لاسباب امنية تم تقسيم `service`   الى نوعين: `Background` و `Foregound`

`Background` اي انا المستخدم لا يعرف اذا كان التطبيق يعمل الان,

 اما `Foreground` فان المستخدم يعرف ذلك لانه النظام يجبرك على استخدام اشعار ثابت طوال حياة `service` لكي يعرف المستخدم ان التطبيق نشط الان

هنا سوف نستخدم `Foreground` من نوع `mediaPlayback`

وسوف نقوم باستخدامها ك `Client-Server` حيث يقوم `Activity` بتلقي معلومات من `Service` عن طريق جعلها `Bound Service`, وهذه العلاقة تنتهي  بينهما بمجرد ان يتم اغلاق التطبيق واستمرار التشغيل في الخلفية

