import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { StoreComponent } from "./store/store.component";
import { LoginComponent } from "./login/login.component";
import { SearchComponent } from "./search/search.component";
import { UserComponent } from "./user/user.component";
import { ErrorComponent } from "./error/error.component";
import { AuthGuard } from "./auth/auth.guard";
import { CookieService } from "ngx-cookie-service";
import { CardModule } from "primeng/card";
import { HttpClientModule } from "@angular/common/http";
import { DataViewModule } from "primeng/dataview";
import { DropdownModule } from "primeng/dropdown";
import { MessageModule } from "primeng/message";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { PanelModule } from "primeng/panel";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ButtonModule } from "primeng/button";
import { ToastModule } from "primeng/toast";
import { GalleriaModule } from "primeng/galleria";
import { CheckboxModule } from "primeng/checkbox";
import { InputTextareaModule } from "primeng/inputtextarea";
import { ProductComponent } from "./product/product.component";
import { SettingsComponent } from "./settings/settings.component";
import { OrdersComponent } from "./orders/orders.component";
import { MessagecenterComponent } from "./messagecenter/messagecenter.component";
import { CartComponent } from "./cart/cart.component";
import { CommonModule } from "@angular/common";
import { SidebarModule } from "primeng/sidebar";
import { PagenotfoundComponent } from "./pagenotfound/pagenotfound.component";
import { TestComponent } from "./test/test.component";
import { CarouselModule } from "primeng/carousel";
import { DiscountedComponent } from "./discounted/discounted.component";
import { FocusAdventComponent } from "./focus-advent/focus-advent.component";
import { PostItemComponent } from "./post-item/post-item.component";
import { BatteryComponent } from "./battery/battery.component";
import { InputSwitchModule } from "primeng/inputswitch";
import { KeyboardComponent } from "./keyboard/keyboard.component";
import { ChargerComponent } from "./charger/charger.component";
import { HarddriveComponent } from "./harddrive/harddrive.component";
import { ScreenComponent } from "./screen/screen.component";
import { ProcessorComponent } from "./processor/processor.component";
import { GraphicscardComponent } from "./graphicscard/graphicscard.component";
import { MotherboardComponent } from "./motherboard/motherboard.component";
import { BagComponent } from "./bag/bag.component";
import { MouseComponent } from "./mouse/mouse.component";
import { UsbdriveComponent } from "./usbdrive/usbdrive.component";
import { WebcamComponent } from "./webcam/webcam.component";
import { GamecontrollerComponent } from "./gamecontroller/gamecontroller.component";
import { HeadsetComponent } from "./headset/headset.component";
import { RamComponent } from "./ram/ram.component";
import { TouchpadComponent } from "./touchpad/touchpad.component";
import { EnclosureComponent } from "./enclosure/enclosure.component";
import { CableComponent } from "./cable/cable.component";
import { NotauthorizedComponent } from "./notauthorized/notauthorized.component";
import { InputTextModule } from "primeng/inputtext";
import { SoftwareComponent } from "./software/software.component";
import { LimitedstockComponent } from "./limitedstock/limitedstock.component";
import { AccessariesforyouComponent } from "./accessariesforyou/accessariesforyou.component";
import { ShortTitlePipe } from "./pipes/short-title.pipe";
import { BrandFilterPipe } from "./pipes/brand-filter.pipe";
import { MinPricePipe } from "./pipes/min-price.pipe";
import { MaxPricePipe } from "./pipes/max-price.pipe";
import { SpecialofferComponent } from "./specialoffer/specialoffer.component";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { RegisterComponent } from "./register/register.component";
import { TeamComponent } from "./team/team.component";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { CaroselComponent } from "./carosel/carosel.component";
import { ScreenDirective } from "./directive/screen.directive";
import { HeaderComponent } from "./header/header.component";
import { LandingComponent } from './landing/landing.component';
import { SidenavigationComponent } from './sidenavigation/sidenavigation.component';
import { WhyfocusComponent } from './whyfocus/whyfocus.component';
import { FooterComponent } from './footer/footer.component';
import { DesignersComponent } from './designers/designers.component';
import { DealsComponent } from './deals/deals.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StoreComponent,
    LoginComponent,
    SearchComponent,
    UserComponent,
    ErrorComponent,
    ProductComponent,
    SettingsComponent,
    OrdersComponent,
    MessagecenterComponent,
    CartComponent,
    PagenotfoundComponent,
    TestComponent,
    DiscountedComponent,
    FocusAdventComponent,
    PostItemComponent,
    BatteryComponent,
    KeyboardComponent,
    ChargerComponent,
    HarddriveComponent,
    ScreenComponent,
    ProcessorComponent,
    GraphicscardComponent,
    MotherboardComponent,
    BagComponent,
    MouseComponent,
    UsbdriveComponent,
    WebcamComponent,
    GamecontrollerComponent,
    HeadsetComponent,
    RamComponent,
    TouchpadComponent,
    EnclosureComponent,
    CableComponent,
    NotauthorizedComponent,
    SoftwareComponent,
    LimitedstockComponent,
    AccessariesforyouComponent,
    ShortTitlePipe,
    BrandFilterPipe,
    MinPricePipe,
    MaxPricePipe,
    SpecialofferComponent,
    RegisterComponent,
    TeamComponent,
    CaroselComponent,
    ScreenDirective,
    HeaderComponent,
    LandingComponent,
    SidenavigationComponent,
    WhyfocusComponent,
    FooterComponent,
    DesignersComponent,
    DealsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardModule,
    CommonModule,
    HttpClientModule,
    DataViewModule,
    DropdownModule,
    MessageModule,
    ReactiveFormsModule,
    PanelModule,
    BrowserAnimationsModule,
    ButtonModule,
    ToastModule,
    GalleriaModule,
    CheckboxModule,
    InputTextareaModule,
    InputTextModule,
    FormsModule,
    SidebarModule,
    CarouselModule,
    InputSwitchModule,
    BreadcrumbModule,
    OverlayPanelModule,
    ProgressSpinnerModule,
  ],
  providers: [CookieService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
