---
template: post
title: انشاء تطبيق يعمل على كل المنصات باستخدام Flutter
slug: flutter-cross-platform
socialImage: /media/flutter-logo-sharing.png
draft: true
date: 2021-08-23T15:49:16.519Z
description: تعرف كيفية انشاء مشروع يعمل على Android,iOS,Web,Macos,Windows و Linux باستخدام Flutter
category: برمجة
tags: [اندرويد,فلتر,Flutter]
---

![](/media/flutter-logo-sharing.png)

# ما هو فلتر ؟ 

فلتر او Flutter هو اطار برمجي حديث لتطوير تطبيقات تعمل على عدة منصات باستخدام قاعدة اكواد واحدة باستخدام لغة Dart, تم تطوير كل من فلتر و Dart عن طريق Google وتستخدمه  داخليا في انظمتها.



####  ما يميز فلتر عن غيره من الاطارات الكثيرة هو عدة اشياء:

- سرعة التطوير
- اداء سريع يضاهي سرعة التطبيقات الاصلية (تطبيقات تم تطويرها خصيصا لمنصة واحدة)
- توفير واجهة برمجية (API) للتعامل مع النظام المستضيف (مثل التعامل مع الكاميرا او GPS)
- خاصية التحديث التلقائي (اظهار التغيرات على الكود دون الحاجة الى اعادة بناء التطبيق من البداية)
- كتابة كود مرة واحده لعدة منصات مثل Android, iOS, Web, Windows, Linux



من اكثر الخواص التي تميز فلتر هو سهولة التعلم والبدء لانه تم تصميم هذ ا الاطار بطريقة تجعل الانتقال من منصة اخرى(مثل `ويب`, `Android` `iOS`) الى فلتر سهل جدا , بسبب ان لغة `Dart` تشبه في صيغتها كثير من اللغات (مثل: `C#`,`Java`,`Kotlin`,`Swift`,`Javascript`)



بالاسفل مثال يوضح وجه الشبه بين

`Dart`:

<div dir="ltr">

```dart
int factorial(int number) { 
   if (number <= 0) {         
      return 1; 
   } else { 
      return (number * factorial(number - 1));    
   } 
}   
```
</div>

`Javascript`:

<div dir="ltr">

```javascript
function factorial(n) {
    if (n == 0 || n == 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}
```

</div>



`Kotlin`:

<div dir="ltr">

``` kotlin
 fun factorial(Int n):Int{    
  if (n == 0)    
    return 1
  else    
    return(n * factorial(n-1));    
 }    
```
</div>



# تنزيل فلتر على جهازك

يمكن تطوير تطبيقات فلتر على اي جهاز كمبيوتر لديك اذا كان ويندز او ماك او لينكس , لكن اذا اردت تشغيل نسخة ماك على ويندز فانه لا يمكنك فعل ذلك بسبب عدم توفر بيئة النظام على النظام المستضيف والعكس صحيح.





