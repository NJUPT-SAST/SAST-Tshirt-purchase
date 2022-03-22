import React, { useState } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Button, Image } from "@tarojs/components";
import welcomeImg from "../../imgs/welcome.png"
import './index.scss'

const Index = () => {
  const [data, setData] = useState({ auth: false });
  return (
    <View className='wrapper'>
      <Image className='logo' src={welcomeImg} />
      <Text className='title'>SAST T-Shirt 购买登记</Text>
      <View id='bottom'>
        <Button onClick={() => {
          Taro.showModal({
            title: '服务协议',
            content: '请你务必认真阅读、充分理解“隐私政策”各条款，并在同意后点击“确认”按钮，才能进行下一步操作。',
            success(e) {
              if (e.confirm) {
                console.log('用户接受隐私政策')
                Taro.showLoading({ title: '加载中', mask: true })
                Taro.getSetting({
                  withSubscriptions: true,
                  success: res => {
                    console.log(res)
                    if (!res.authSetting["scope.userInfo"]) {
                      while (!data.auth) {
                        Taro.authorize({
                          scope: 'scope.userInfo',
                          success: (auth_res) => {
                            console.log(auth_res);
                            setData((prev) => { return { ...prev, auth: true } });
                            Taro.redirectTo({ url: '/pages/form/index' })
                            Taro.hideLoading();
                          }
                        })
                      }
                    } else {
                      setData((prev) => { return { ...prev, auth: true } });
                      Taro.login({
                        success: function (login_res) {
                          console.log(login_res);
                          Taro.redirectTo({ url: '/pages/form/index' })
                          Taro.hideLoading();
                        }
                      })
                    }
                  }
                })
              }
              else if (e.confirm) {
                console.log('用户未接受隐私政策')
              }
            }
          })
        }} className='btn-welcome' type='default'
        >马上登记</Button>

        <Text className='info underline private' onClick={() => {
          Taro.showModal({
            title: 'SAST Shop 微信小程序隐私政策',
            content: '      更新日期：2022年3月20日\r\n      生效日期：2022年3月20日\r\n\r\n      本隐私政策将帮助你了解：\r\n      (1)为了保障产品的正常运行，提供 T-Shirt 购买信息登记等核心功能以及其他功能，我们会收集你的部分必要信息;\r\n      (2)在你进行使用报名、批卷等相关服务时，基于法律要求或实现功能所必须，我们可能会收集微信 OpenID 等个人敏感信息。你有权拒绝向我们提供这些信息，或者撤回你对这些信息的授权同意。请你了解，拒绝或撤回授权同意,将导致你无法使用相关的特定功能;\r\n      (3)我们会将在境内运营过程中收集和产生的你的个人信息存储于中华人民共和国境内，并不会将上述信息传输至境外。我们仅会在为提供 SAST Shop 微信小程序及相关服务之目的所必需的期间内保留你的个人信息;\r\n      (4)我们不会向第三方共享、提供、转让或者从第三方获取你的个人信息，除非经过你的同意;\r\n      (5)我们将努力采取合理的安全措施来保护你的个人信息。\r\n\r\n\r\n      我们非常重视用户个人信息的保护，并且将以勤勉和审慎的义务对待这些信息。你在使用 SAST Shop 微信小程序及相关服务时，我们将按照本隐私政策收集、保存、使用、共享、披露及保护（以下统称“处理”）你的个人信息。我们希望通过本隐私政策向你介绍我们对你个人信息的处理方式，因此我们建议你认真完整地阅读本隐私政策的所有条款。其中，与你信息及权利相关的内容将以加粗的形式提示你注意，请你重点阅读。\r\n\r\n      本隐私政策旨在帮助你了解以下内容：\r\n      一、我们如何收集和使用个人信息\r\n      二、我们对Cookie和同类技术的使用\r\n      三、我们如何存储个人信息\r\n      四、我们如何共享、转让、公开披露个人信息\r\n      五、我们如何保护个人信息的安全\r\n      六、你的权利\r\n      七、未成年人使用条款\r\n      八、隐私政策的修订和通知\r\n      九、适用范围\r\n      十、其他\r\n\r\n\r\n      一、我们如何收集和使用个人信息\r\n\r\n      在你使用 SAST Shop 微信小程序及服务的过程中，我们将根据合法、正当、必要的原则，收集信息。我们收集或请你提供的信息将用于：\r\n      1.保障产品的基础正常运行；\r\n      2.实现各项功能和服务；\r\n      3.优化、改善产品和服务；\r\n      4.保障产品、服务以及用户使用安全；\r\n      5.遵循法律法规与国家标准的规定。\r\n\r\n      （一）我们主动收集与使用的个人信息\r\n      我们会按照如下方式收集你在使用服务时主动提供的，以及你在使用功能或接受服务过程中产生的信息：\r\n      1.保障 SAST Shop 微信小程序及相关服务的正常运行\r\n      当你使用 SAST Shop 微信小程序及相关服务时，为了保障软件与服务的正常运行，我们会收集你的微信信息如OpenID、昵称、操作日志等信息。请你了解，这些信息是我们提供服务和保障产品正常运行所必须收集的基本信息。\r\n      2.为你提供二维码扫描、报名信息填写等功能或服务\r\n      二维码扫描、报名信息填写是 SAST Shop 微信小程序核心的功能之一。为实现这一功能，我们会请求你授权相机（摄像头）、照片等敏感权限。你如果拒绝授权提供某些权限，将无法使用相关的功能，但不影响你正常使用 SAST Shop 微信小程序的其他功能。\r\n      请你了解，我们收集、使用上述信息时进行了去标识化处理/匿名化处理，数据分析仅对应特定的、无法直接关联用户身份的编码。\r\n      4.保障产品、服务及用户使用安全\r\n      为帮助我们更好地了解 SAST Shop 微信小程序及相关服务的运行情况，以便确保运行与提供服务的安全，我们可能记录网络日志信息，以及使用软件及相关服务的频率、崩溃数据、总体使用情况、性能数据等信息。\r\n\r\n      （二）收集、使用个人信息目的变更的处理\r\n      请你了解，随着我们业务的发展，可能会对 SAST Shop 微信小程序的功能和提供的服务有所调整变化。在与原目的无直接或合理关联的场景下，我们收集、使用你的个人信息，会再次进行告知，并征得你的同意。\r\n\r\n      （三）依法豁免征得同意收集和使用的个人信息\r\n      请你理解，在下列情形中，根据法律法规和/或相关国家标准，我们收集和使用你的个人信息无需征得你的授权同意：\r\n      （1）与国家安全、国防安全直接相关的；\r\n      （2）与公共安全、公共卫生、重大公共利益直接相关的；\r\n      （3）与犯罪侦查、起诉、审判和判决执行等直接相关的；\r\n      （4）出于维护个人信息主体或其他个人的生命、财产等重大合法权益但又很难得到本人同意的；\r\n      （5）所收集的你的个人信息是你自行向社会公众公开的；\r\n      （6）从合法公开披露的信息中收集的你的个人信息的，如合法的新闻报道、政府信息公开等渠道；\r\n      （7）根据你的要求签订和履行合同所必需的；\r\n      （8）用于维护 SAST Shop 微信小程序及相关服务的安全稳定运行所必需的，例如发现、处置 SAST Shop 微信小程序及相关服务的故障；\r\n      （9）法律法规规定的其他情形。\r\n      特别提示你注意，如信息无法单独或结合其他信息识别到你的个人身份，其不属于法律意义上你的个人信息；当你的信息可以单独或结合其他信息识别到你的个人身份时或我们将无法与任何特定个人信息建立联系的数据与其他你的个人信息结合使用时，则在结合使用期间，这些信息将作为你的个人信息按照本隐私政策处理与保护。\r\n\r\n      二、对Cookie和同类技术的使用Cookie\r\n\r\n      和同类技术是互联网中的通用常用技术。当你使用 SAST Shop 微信小程序及相关服务时，我们可能会使用相关技术向你的设备发送一个或多个Cookie\r\n      或匿名标识符，以收集和存储你访问、使用本产品时的信息。我们使用Cookie和同类技术主要为了实现以下功能或服务：\r\n\r\n      （一）保障产品与服务的安全、高效运转\r\n      我们可能会设置认证与保障安全性的cookie或匿名标识符，使我们确认你是否安全登录服务，或者是否遇到盗用、欺诈等不法行为。这些技术还会帮助我们改进服务效率，提升登录和响应速度。\r\n\r\n      （二）帮助你获得更轻松的访问体验\r\n      使用此类技术可以帮助你省去重复填写报名信息的步骤和流程。\r\n\r\n      三、我们如何存储个人信息\r\n\r\n      （一）信息存储的地点\r\n      我们依照法律法规的规定，将在境内运营过程中收集和产生的你的个人信息存储于中华人民共和国境内。目前，我们不会将上述信息传输至境外，如果我们向境外传输，我们将会遵循法律法规的规定，征求你的明示同意。\r\n\r\n      （二）存储期限\r\n      我们仅在为提供 SAST Shop 微信小程序及相关服务之目的所必需的期间内保留你的个人信息。超出必要期限后，我们将对你的个人信息进行删除或匿名化处理，但法律法规另有规定的除外。\r\n\r\n      四、我们如何共享、转让、公开披露个人信息\r\n\r\n      （一）个人信息的共享、转让\r\n      我们不会向第三方共享、转让你的个人信息，除非经过你本人事先授权同意，或者共享、转让的个人信息是匿名化处理后的信息，且第三方无法根据此类信息重新识别自然人主体。\r\n      1.为实现相关功能或服务于关联方共享\r\n      当你在使用 SAST Shop 微信小程序及相关服务提供的内容同步功能时，你在我们及关联方提供的产品间所接受服务的一致性，并方便统一管理你的信息，经过你的明示同意，我们可能会将你的个人信息与这些关联方共享。\r\n      2.为实现特定功能而造成用户信息共享\r\n       SAST Shop 微信小程序中会对您的个人信息生成二维码，您可通过分享二维码实现阅卷批卷功能，在此分享过程中，你的二维码可能会被他人使用而覆盖你的分数。如您介意此功能，可以在活动结束后通过微信小程序“意见反馈”或发送电子邮件（sast@njupt.edu.cn）方式与我们取得联系。\r\n\r\n      （二）个人信息的公开披露\r\n      除对违规账号、欺诈行为进行处罚公告时，我们会披露相关账号的必要信息外，我们不会公开披露你的信息，除非遵循国家法律法规规定或者获得你的自主选择同意。我们公开披露你的个人信息会采用符合行业内标准的安全保护措施。\r\n\r\n      （三）依法豁免征得同意共享、转让、公开披露的个人信息\r\n      请你理解，在下列情形中，根据法律法规和/或相关国家标准，我们共享、转让、公开披露你的个人信息无需征得你的授权同意\r\n      （1）与国家安全、国防安全直接相关的；\r\n      （2）与公共安全、公共卫生、重大公共利益直接相关的；\r\n      （3）与犯罪侦查、起诉、审判和判决执行等直接相关的；\r\n      （4）出于维护你或其他个人的生命、财产等重大合法权益但又很难得到你本人同意的；\r\n      （5）你自行向社会公众公开的个人信息；\r\n      （6）从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道。\r\n\r\n      五、我们如何保护个人信息安全\r\n\r\n      （一）我们非常重视你个人信息的安全，将努力采取合理的安全措施（包括技术方面和管理方面）来保护你的个人信息，防止你提供的个人信息被不当使用或未经授权的情况下被访问、公开披露、使用、修改、损坏、丢失或泄漏。\r\n\r\n      （二）我们会使用不低于行业的加密技术、匿名化处理等合理可行的手段保护你的个人信息，并使用安全保护机制防止你的个人信息遭到恶意攻击。\r\n\r\n      （三）我们依托相关安全部门、安全管理制度、数据安全流程保障你的个人信息安全。我们采取严格的数据使用和访问制度，确保只有授权人员才可访问你的个人信息，并适时对数据和技术进行安全审计。\r\n\r\n      （四）尽管已经采取了上述合理有效措施，并已经遵守了相关法律规定要求的标准，但请你理解，由于技术的限制以及可能存在的各种恶意手段，在互联网行业，即便竭尽所能加强安全措施，也不可能始终保证信息百分之百的安全，我们将尽力确保你提供给我们的个人信息的安全性。你知悉并理解，你接入我们的服务所用的系统和通讯网络，有可能因我们可控范围外的因素而出现问题。因此，我们强烈建议你采取积极措施保护个人信息的安全、不将自己的微信账号密码等个人信息透露给他人。\r\n\r\n      （五）我们会制定应急处理预案，并在发生用户信息安全事件时立即启动应急预案，努力阻止该等安全事件的影响和后果扩大。一旦发生用户信息安全事件（泄露、丢失等）后，我们将按照法律法规的要求，及时向你告知：安全事件的基本情况和可能的影响、我们已经采取或将要采取的处置措施、你可自主防范和降低风险的建议、对你的补救措施等。我们将及时将事件相关情况以推送通知、邮件、信函、短信等形式告知你，难以逐一告知时，我们会采取合理、有效的方式发布公告。同时，我们还将按照相关监管部门要求，上报用户信息安全事件的处置情况。\r\n\r\n      （六）我们谨此特别提醒你，本隐私政策提供的个人信息保护措施仅适用于 SAST Shop 微信小程序及相关服务。一旦你离开 SAST Shop 微信小程序及相关服务，浏览或使用其他网站、服务及内容资源，我们即没有能力及义务保护你在 SAST Shop 微信小程序及相关服务之外的软件、网站提交的任何个人信息，无论你登录、浏览或使用上述软件、网站是否基于 SAST Shop 微信小程序的链接或引导。\r\n\r\n      六、你的权利\r\n\r\n      我们非常重视你对个人信息的管理，并尽全力保护你对于你个人信息的访问、修改（更新或更正）、删除以及撤回授权同意的权利，以使你拥有充分的能力保障你的隐私和安全。\r\n\r\n      （一）管理、撤回授权你的信息\r\n      你可以通过取消登录状态、关闭功能、在客户端设置中更改应用程序权限等方式撤回你的同意，改变你授权我们继续收集个人信息的范围或撤回你的授权。请你理解，特定的业务功能和服务将需要你的信息才能得以完成，当你撤回同意或授权后，我们无法继续为你提供撤回同意或授权所对应的功能和服务，也不再处理你相应的个人信息。但你撤回同意或授权的决定，不会影响此前基于你的授权而开展的个人信息处理。\r\n      如果你认为我们违反法律法规规定或与你的约定收集、使用你的个人信息，你也可以通过微信小程序“意见反馈”或发送电子邮件（sast@njupt.edu.cn）方式与我们取得联系，并要求删除你的相关个人信息。我们将尽快确认所涉问题，并由专人验证你的用户身份后及时予以回复与处理。\r\n\r\n      （二）注销你的账号\r\n      你可以通过微信小程序“意见反馈”或发送电子邮件（sast@njupt.edu.cn）方式与我们取得联系，申请注销账号，在你注销账号前，我们将验证你的个人身份、安全状态、设备信息等。你知悉并理解，注销账号的行为是不可逆的行为，一旦你注销账号，我们将停止为你提供相关服务。\r\n\r\n      （三）投诉举报\r\n      在 SAST Shop 微信小程序及相关服务的某些业务功能中，我们可能依据信息系统、算法等在内的非人工自动决策机制作出决定，如果这些决定显著影响你的合法权益，你有权要求我们作出解释，我们也将提供适当的救济方式。\r\n      对于你上述合理的请求，我们原则上不会收取任何费用。但对多次重复、超出合理限度的请求，我们将视实际情况收取一定成本费用。对于无端重复、需要过多技术手段（如需要开发新系统或从根本上改变现行管理）、给他人合法权益带来风险或非常不切实际的请求，我们可能予以拒绝。\r\n\r\n      （四）访问隐私政策\r\n      你可以在每次打开 SAST Shop 微信小程序首页上查看本隐私政策的全部内容。\r\n\r\n      （五）停止运营向你告知权利\r\n      如我们停止运营，我们将及时停止收集你个人信息的活动，将停止运营的通知以逐一送达或公告的形式通知你，并对所持有的你的个人信息进行删除或匿名化处理。\r\n\r\n      七、未成年人条款\r\n      若你是未满18周岁的未成年人，在使用 SAST Shop 微信小程序及相关服务前，应在你的父母或其他监护人监护、指导下共同阅读并同意本隐私政策。\r\n      我们根据国家相关法律法规的规定保护未成年人的个人信息，只会在法律允许、父母或其他监护人明确同意或保护未成年人所必要的情况下收集、使用、共享或披露未成年人的个人信息；如果我们发现在未事先获得可证实的父母（或其他监护人）同意的情况下收集了未成年人的个人信息，则会设法尽快删除相关信息。\r\n      若你是未成年人的监护人，当你对你所监护的未成年人的个人信息有相关疑问时，请通过本隐私政策公示的联系方式与我们联系。\r\n\r\n      八、隐私政策的修订和通知\r\n\r\n      （一）为了给你提供更好的服务， SAST Shop 微信小程序及相关服务将不时更新与变化，我们会适时对本隐私政策进行修订，该等修订构成本隐私政策的一部分并具有等同于本隐私政策的效力。但未经你明确同意，我们不会削减你依据当前生效的本隐私政策所应享受的权利。\r\n\r\n      （二）本隐私政策更新后，我们会在 SAST Shop 微信小程序应用程序发出更新版本，并在更新后的条款生效前以适当的方式提醒你更新的内容，以便你及时了解本隐私政策的最新版本。如你继续使用我们的服务，表示同意接受修订后的本隐私政策的内容，但是如果更新的内容需要个人敏感信息，仍会再次以显著方式征求你的同意。\r\n\r\n      （三）对于重大变更，我们还会提供更为显著的通知（我们会通过包括但不限于邮件、短信、私信或在浏览页面做特别提示等方式，说明隐私政策的具体变更内容）。\r\n      本隐私政策所指的重大变更包括但不限于：\r\n      1.我们的服务模式发生重大变化。如处理个人信息的目的、处理的个人信息的类型、个人信息的使用方式等；\r\n      2.我们在所有权结构、组织架构等方面发生重大变化。如业务调整、破产并购等引起的所有权变更等；\r\n      3.个人信息共享、转让或公开披露的主要对象发生变化；\r\n      4.你参与个人信息处理方面的权利及其行使方式发生重大变化；\r\n      5.我们负责处理个人信息安全的责任部门、联络方式及投诉渠道发生变化时。\r\n\r\n      九、适用范围\r\n      本隐私政策适用于由南京邮电大学大学生科学技术协会及其关联方提供的所有服务，包括 SAST Shop 微信小程序等，不适用于有单独的隐私政策且未纳入本隐私政策的第三方产品或服务。\r\n\r\n      本隐私政策不适用于：\r\n      1.其他第三方产品或服务，可能包括在个性化推荐中向你显示的产品或网站和广告内容或者 SAST Shop 微信小程序及相关服务中链接到的其他产品或网站；\r\n      2.为 SAST Shop 微信小程序及相关服务进行广告宣传的其他第三方。\r\n      你使用这些第三方服务（包括你向这些第三方提供的任何个人信息），将受这些第三方的服务条款及隐私政策约束（而非本隐私政策），具体规定请你仔细阅读第三方的条款。请你妥善保护自己的个人信息，仅在必要的情况下向第三方提供。\r\n\r\n      本隐私政策中所述的 SAST Shop 微信小程序及相关服务有可能会根据你所使用的手机型号、系统版本、软件应用程序版本等因素而有所不同。最终的产品和服务以你所使用的 SAST Shop 微信小程序及相关服务为准。\r\n\r\n      如对本隐私政策内容有任何疑问、意见或建议，你可通过登录 SAST Shop 微信小程序的“意见反馈”页面或发送邮件至sast@njupt.edu.cn与我们联系。\r\n\r\n      十、其他\r\n\r\n      （一）本隐私政策中的标题仅为方便及阅读而设，并不影响本隐私政策中任何规定的含义或解释。\r\n\r\n      （二）本隐私政策的版权为南京邮电大学大学生科学技术协会所有，在法律允许的范围内，我们拥有解释和修改的权利。',
            success: function (res) {
              if (res.confirm) {
                console.log('用户确定隐私政策')
              } else if (res.cancel) {
                console.log('隐藏隐私政策弹窗')
              }
            }
          })
        }}
        >隐私政策</Text>
        <Text className='info copyright'>©2022 SAST</Text>
      </View>
    </View>
  );
};

export default Index;
