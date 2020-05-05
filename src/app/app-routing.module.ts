import { NgModule } from "@angular/core";
import { RouterModule, Route } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { StoreComponent } from "./store/store.component";
//import { LoginComponent } from "./login/login.component";
import { SearchComponent } from "./search/search.component";
import { UserComponent } from "./user/user.component";
import { ErrorComponent } from "./error/error.component";
import { AuthGuard } from "./auth/auth.guard";
import { ProductComponent } from "./product/product.component";
import { PagenotfoundComponent } from "./pagenotfound/pagenotfound.component";
import { PostItemComponent } from "./post-item/post-item.component";
import { BatteryComponent } from "./battery/battery.component";
import { KeyboardComponent } from "./keyboard/keyboard.component";
import { ChargerComponent } from "./charger/charger.component";
import { HarddriveComponent } from "./harddrive/harddrive.component";
import { ScreenComponent } from "./screen/screen.component";
import { ProcessorComponent } from "./processor/processor.component";
import { GraphicscardComponent } from "./graphicscard/graphicscard.component";
import { MotherboardComponent } from "./motherboard/motherboard.component";
import { TouchpadComponent } from "./touchpad/touchpad.component";
import { RamComponent } from "./ram/ram.component";
import { BagComponent } from "./bag/bag.component";
import { MouseComponent } from "./mouse/mouse.component";
import { UsbdriveComponent } from "./usbdrive/usbdrive.component";
import { WebcamComponent } from "./webcam/webcam.component";
import { GamecontrollerComponent } from "./gamecontroller/gamecontroller.component";
import { HeadsetComponent } from "./headset/headset.component";
import { EnclosureComponent } from "./enclosure/enclosure.component";
import { CableComponent } from "./cable/cable.component";
import { NotauthorizedComponent } from "./notauthorized/notauthorized.component";
import { SoftwareComponent } from "./software/software.component";
import { SpecialofferComponent } from "./specialoffer/specialoffer.component";
//import { RegisterComponent } from "./register/register.component";
import { LandingComponent } from "./landing/landing.component";
import { DesignersComponent } from "./designers/designers.component";

const routes: Route[] = [
  { path: "", redirectTo: "/home/mall", pathMatch: "full" },
  {
    path: "home",
    component: HomeComponent,

    children: [
      { path: "", redirectTo: "mall", pathMatch: "full" },
      {
        path: "store",
        component: StoreComponent,
        data: { animation: "StorePage" },
      },
      {
        path: "mall",
        component: LandingComponent,
        children: [
          { path: "", redirectTo: "designers", pathMatch: "full" },
          {
            path: "designers",
            component: DesignersComponent,
            data: { animation: "DesignersPage" },
          },
        ],
      },
      // {path: 'login' , component: LoginComponent,data: {animation: 'LoginPage'}},
      //{path: 'register' , component: RegisterComponent,data: {animation: 'RegisterPage'}},
      {
        path: "product",
        component: ProductComponent,
        data: { animation: "ProductPage" },
      },
      {
        path: "specialoffer",
        component: SpecialofferComponent,
        data: { animation: "SpecialOfferPage" },
      },
      {
        path: "search",
        component: SearchComponent,
        data: { animation: "SearchPage" },
      },
      {
        path: "user",
        component: UserComponent,
        canActivate: [AuthGuard],
        data: { animation: "UserPage" },
      },
      {
        path: "postAds",
        component: PostItemComponent,
        data: { animation: "PostAdsPage" },
      },
      {
        path: "postbattery",
        component: BatteryComponent,
        data: { animation: "BatteryPage" },
      },
      {
        path: "postkeyboard",
        component: KeyboardComponent,
        data: { animation: "KeyboardPage" },
      },
      {
        path: "postcharger",
        component: ChargerComponent,
        data: { animation: "ChargerPage" },
      },
      {
        path: "postharddrive",
        component: HarddriveComponent,
        data: { animation: "HdPage" },
      },
      {
        path: "postscreen",
        component: ScreenComponent,
        data: { animation: "ScreenPage" },
      },
      {
        path: "postprocessor",
        component: ProcessorComponent,
        data: { animation: "ProcessorPage" },
      },
      {
        path: "postgraphicscard",
        component: GraphicscardComponent,
        data: { animation: "GraphicsCardPage" },
      },
      {
        path: "postmotherboard",
        component: MotherboardComponent,
        data: { animation: "MotherBoardPage" },
      },
      {
        path: "posttouchpad",
        component: TouchpadComponent,
        data: { animation: "TouchPadPage" },
      },
      {
        path: "postram",
        component: RamComponent,
        data: { animation: "RamPage" },
      },
      {
        path: "postbag",
        component: BagComponent,
        data: { animation: "BagPage" },
      },
      {
        path: "postmouse",
        component: MouseComponent,
        data: { animation: "MousePage" },
      },
      {
        path: "postusbdrive",
        component: UsbdriveComponent,
        data: { animation: "UsbDrivePage" },
      },
      {
        path: "postwebcam",
        component: WebcamComponent,
        data: { animation: "WebCamPage" },
      },
      {
        path: "postcontroller",
        component: GamecontrollerComponent,
        data: { animation: "GameControllerPage" },
      },
      {
        path: "postheadset",
        component: HeadsetComponent,
        data: { animation: "HeadsetPage" },
      },
      {
        path: "postenclosure",
        component: EnclosureComponent,
        data: { animation: "EnclosurePage" },
      },
      {
        path: "postcable",
        component: CableComponent,
        data: { animation: "CablePage" },
      },
      {
        path: "postsoftware",
        component: SoftwareComponent,
        data: { animation: "SoftwarePage" },
      },
      {
        path: "nonauthorized",
        component: NotauthorizedComponent,
        data: { animation: "NotAuthorizedPage" },
      },
      {
        path: "error",
        component: ErrorComponent,
        data: { animation: "ErrorPage" },
      },
      { path: "**", redirectTo: "error" },
    ],
  },
  {
    path: "404",
    component: PagenotfoundComponent,
    data: { animation: "P404Page" },
  },
  { path: "**", redirectTo: "404" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
