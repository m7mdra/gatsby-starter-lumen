---
template: post
title:  ما هو تسريب الذاكرة؟ وكيف يمكن ان يحصل؟

slug: memory-leaks
socialImage: /media/compaq-323012-001-ram-memory-memory-compaq-compaq-deskpro-storage.jpg
draft: false
date: 2022-02-03T15:49:16.519Z
description: تعرف على تسريب الذاكرة
category: برمجة
tags: [اندرويد,برمجة]
---

# ما هو تسريب الذاكرة؟



![RAM](https://p1.pxfuel.com/preview/208/755/771/compaq-323012-001-ram-memory-memory-compaq-compaq-deskpro-storage.jpg)

السلام عليكم

جميعنا نعرف ان المتغيرات يتم تخزينها في الذاكرة العشوائية `RAM` وعندما يتم تعريف كائن جديد يقوم المترجم `Compiler` بتحديد موقع في الذاكرة واسناده للمتغير.



يظهر تسريب الذاكرة عندما تقوم بتعريف كائن ويقوم النظام بدروه بتحديد موقع الذاكرة وعند الانتهاء من استخدام المتغير لا يتم تسريحه, قد لا تظهر هذه المشكلة فورا ولكن مع الاستخدام الخاطئ المتواصل للمتغير قد تحصل عده مشاكل واكبر مشكله هي امتلاء الذاكرة بسبب المتغيرات الكثيرة الغير مسرحة وتراجع اداء الجهاز المستضيف الى ان يقوم النظام بنفسه باغلاق البرنامج مثلما يحصل في اندرويد

 تسريب الذاكرة عدم قدرة جهاز الحاسب على تسريح مصادر الجهاز لانه لم يتم تسريحها من البرنامج المالك لهذه المصادر



اذا كانت خلفيتك المعرفية هي لغات تتحوى على تسريح تلقائي للذاكرة(Garbage collection) قد لا يكون هذه المفهوم واضحا لان النظام يقوم بهذه العملية تلقائيا ولكن في بعض الحالات قد يكون النظام مجبرعلى انتظار الانتهاء من الكائن.

ما يجعل تسريب الذاكرة صعب الكشف انه خطا غير منطقي ولا يظهر تلقائيا مما يعني انه لن يظهر عندما تتم ترجمة الكود.



### مثال 

سوف استخدم مثال المصعد او Elevator

![](https://cdn4.picryl.com/photo/2019/09/16/elevator-lobby-appraisers-building-san-francisco-california-c01b49-1024.jpg)

تخيل ان لدينا بناية تحتوي ٤ مصاعد , كل مصعد يسع لشخص واحد(متغير), ثم ياتي ٤ اشخاص كل منهم يريد الصعود الى شقته في احدى طوابق البناية, يصعد الاربعة اشخاص في نفس الوقت, يصل الشخص الاول والثاني, ولكن الثالث علق به المصعد في المنتصف والشخص الرابع لم يستطع الصعود لانه هنالك مشكلة في ازار التحكم في المصعد, هكذا قلت كفائة المصاعد في البناية واصبح اثنان فقط يعملان, هذا سوف يسبب زحمة في الصعود والنزول من والى الشقق. هذا يشابة ما يحصل في عملية تسريب الذاكرة


# امثلة من لغات برمجة

هذه امثلة من لغات برمجة استخدمها وقد واجهتها من قبل, اذا لم تجد لغتك هنا فيمكنك ايجاد امثلة من على الويب

#####  Java

<div dir="ltr">

```java
public class LeaksActivity extends Activity implements LocationListener {
private LocationManager locationManager;

@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_leaks);
  
  
    locationManager = (LocationManager) getSystemService(LOCATION_SERVICE);
    locationManager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER,
            TimeUnit.MINUTES.toMillis(5), 100, this);
}

@Override
protected void onDestroy() {
  // ايقاف الكائن
    locationManager.removeUpdates(this);
    super.onDestroy();
}

}
```
</div>


بدون `locationManager.removeUpdates(this)` سوف يستمر الكائن بالعمل حتى اذا انتهيت منه


##### Objective C



<div dir="ltr">

```objectivec
#import "locationManager.h"

@implementation mainFile

@synthesize locationManager;
@synthesize myLocation;

- (void)locationError:(NSError *)error{
// Do alert-Stuff
}

- (void)locationUpdate:(CLLocation *)location {
// Do location-Stuff
}

- (void)viewDidLoad
{
    [super viewDidLoad];

    locationManager = [[[locationManager alloc] init] autorelease];

    locationManager.delegate = self;
    [locationManager.myLocationManager startUpdatingLocation];
}

- (void)dealloc {
  // تسريح للكائن
    [locationManager release];
}

@end
```
</div>

هنالك العديد من الامثلة التى قد تواجهها هذه كانت بعض الحالات التى واجهتها.

هنالك العديد من بيئات تطوير متكاملة(IDE) تاتي مزودة باداوات للمساعدة على كشف مثل هذه الاخطاء
مثل [Android](https://developer.android.com/studio/profile/memory-profiler) او [iOS](https://help.apple.com/instruments/mac/current/#/dev022f987b)