import {chromium, request, test} from "@playwright/test";
import loginData from "utils/login-data.js";
import {LoginPage} from "page-object/login-page.js";
import fs from 'fs'

let storageState = await JSON.parse(fs.readFileSync('./state.json'));
let cookie = JSON.stringify(storageState.cookies);
let token = storageState.cookies.find(obj => obj.name === 'CSRFTOKEN').value;


let page;
test.describe('Authorization', () => {
    test.beforeAll(async ({request}) => {
        // const browser = await chromium.launch();
        // page = await browser.newPage();
        // const login = new LoginPage(page)
        // await login.login()
        // cookie = await page.evaluate(cook => document.cookie)
        // cookie = 'CSRFTOKEN=d5bj9k7XsVOzriXJ56g6uQSVKOzzOaFY; s_cc=true; s_sq=rc-4%3D%2526pid%253DLoginViaEmail_UnifiedUI%2526pidt%253D1%2526oid%253Dfunctionsn()%25257B%25257D%2526oidt%253D2%2526ot%253DBUTTON'
        // let token = 'd5bj9k7XsVOzriXJ56g6uQSVKOzzOaFY;'

        // const loginInfoResponse = await request.post(loginData.URL_LOGIN, {
        //             headers: {
        //                 'CSRFTOKEN': token,
        //                 'Cookie': cookie
        //             },
        //             data: {
        //                 "username": "valkeare@inbox.ru",
        //                 "password": "Tst123123",
        //                 "brandId": 1210,
        //                 "clientId": "htPeaGLLSsy4ssTPpjCdtg",
        //                 "appUrlScheme": "https://demo-ai-wi.lab.nordigy.ru/welcome/join",
        //             }
        //         })
        // console.log(await loginInfoResponse.json());

        // const consentRequest = await request.post('https://login.ringcentral.com/api/generate-code', {
        //     headers: {
        //         'CSRFTOKEN': 'Z4cEHOT4GV6dBk2Fh4E90AhmsHyfajhi',
        //         'Cookie': 'CSRFTOKEN=Z4cEHOT4GV6dBk2Fh4E90AhmsHyfajhi'
        //     },
        //     data: {
        //         "clientId": loginData.CLIENTID,
        //         "appUrlScheme": loginData.URL_JOIN_DEMO
        //     }
        // })
        // console.log(await consentRequest.json());
        //
        // const consentRequest = await request.post('https://login.ringcentral.com/api/generate-code', {
        //     headers: {
        //         'CSRFTOKEN': token,
        //         'Cookie': cookie
        //     },
        //     data: {
        //         "clientId": loginData.CLIENTID,
        //         "appUrlScheme": loginData.URL_JOIN_DEMO
        //     }
        // })
        // console.log(await consentRequest.json());
    })

        // const authorizationLink = (await loginInfoResponse.json()).redirectUri
        // const link = await loginInfoResponse.json()
        // console.log(link);
        // await page.goto(authorizationLink)
        // await page.waitForNavigation()
        // })
        // test('Request test', async ({request}) => {
        //     const loginInfoRequest = await request.post('https://login.ringcentral.com/api/login-info', {
        //         data: {
        //
        //         "username": "valkeare@inbox.ru",
        //         "extension": "",
        //         "brandId": 1210,
        //         "captchaCode": "",
        //         "clientId": "htPeaGLLSsy4ssTPpjCdtg"
        //
        //         }
        //     })
        //     console.log(await loginInfoRequest.json());
        //
        //     const loginRequest = await request.post('https://login.ringcentral.com/api/login', {
        //         headers: {
        //             'Cookie': 'CLW_VERSION=22.2.3; PLA_SESSION=-576245123566681417; RCAuthSession=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJyY1wiOnRydWUsXCJydHBcIjpcImNvZGVcIixcInNjXCI6XCJcIixcImdhXCI6ZmFsc2UsXCJjY1wiOlwiXCIsXCJjY21cIjpcIlwiLFwicGRcIjp0cnVlfSJ9.rTBSFTJaTGsJJdIBY_JhFJDgW-cRUAiZmrRASYlaE7k; RCBRAND=1210; CSRFTOKEN=pWpf9pGv9LUuA9DEnucX6Wmn3ULqwRGR; s_cc=true; s_sq=[[B]]',
        //             'CSRFTOKEN': 'pWpf9pGv9LUuA9DEnucX6Wmn3ULqwRGR'
        //         },
        //         data: {
        //             "username": "valkeare@inbox.ru",
        //             "password": "Tst123123",
        //             "autoLogin": true,
        //             "ibb": "0400bpNfiPCR/AUNf94lis1ztktp1nPiBTkiyGkcphoaxfC7s9WMsBe56znBIV0Zo4Iydik+BCIRXKLoQ/lgRjCMdKh1fJQrFSBW1n74tpcOq4hFXx+VLtT2uuBFh8X+3nkvn5XuuXsupK18JPiI2c/rQAo5VNMvaDXfrI3MaSYrgzshIqKrjK+gdyAFUwN05hXzcycRhS8EwApMRV0YmXEHAJzxpxtwqoC5Z/uCi7ME8loQwLLSzeFEuVfe4edP+YyrEsp6nSACJCbWkXsdVqgk+LuvNvEfRkJupBy3Z8hSEMEK7ZWd2T2HOvTA3ilp5/VVxIMvNUQyb8NEDHGdvYz0KbP0d0o85vIgSEbDnvLM+PLrKLMr0l4iXEIdvEt+MbJEO8xzyZZyces4cd3X0jzFPm/kce6S7PuTv9eOvsyvTBVVGK66EXEuaD0YLXuOWeFz09AMY7408GLvUSbJ+Ltz3R3+1lLYqHZEbzp4hw/Ot1oMIAS2FwU4r83zpn+qWl91KULPxBs5mS/3D4zxSJGeK2+nWfds6mwY0/b6EJXfvVsEMUscz7kbcnG9B+SIx5AnCkrOClWCgeLTYbtpHForAdQeGwCeB4LedNymITnEQuUlL3DOwAl0hlzqeMmBCH/inFJjUN1WkR/h9ab6KCDqUzOpvCmZZrwjH2xzjbhzlXn4X35U0eVzPZXAAYR3cfgv3nZEBQ8rALMtAB9loDuNKLAcesNbcdJjGc+x7ZkkKyrh7d/W78RPOnlWmCRBdNDNnZsKRSTH+IPWVmnS2l6trL/g+hNe6Gv0VTw2C4oQ2p6vWc20/w4QKST/riUqiozfAOitx40UDzaLaxNWMM2S8UTjbKzZpUNBxKb7FG+fia+fFCEvMT9cc6XakoCa7XCW5+Cltm6/m0VPMQF00uJew0LT2BH9Dx8Z6yFodg/w6rqT5xVcmJXbIoCZ40cfr7Dq6c1YsRAau2dyYTWz+iFKIP7ViNGJ+hxMguuw/iGUoS+7lCTnaSSKlUW0HWEJix/naYvWyq0E4j42xuVc8YhVml6Woq8D4h/c1phyxr9XsErIgJis4TjHDZs+tc4cxQdXJrsXwsrcmGHI8I7OQmtv8AXYYpvbyv1LEOVzmJtDqimwLY4MxzBgJC0y5BDeC+xHyPCOzkJrb/AF2GKb28r9SxDlc5ibQ6opsC2ODMcwYCQtMuQQ3gvsR8jwjs5Ca2/wBdhim9vK/UsHHycuTOUTb5VPfVKB9sZJoyxJNGPPe4OmoVlHQzSpc8vxY1ywTJadRnwZh5U7Sofq+OTNVMedIGaGBRMp9zMyIi7SoUevORp0fwvcYpuKcyNB1ZjTOIVBcegqNpwOQNYKpZ/ylm46rf7F8DDjfABIwd/c96Opv2o=",
        //             "sddi": "",
        //             "ui_options": "remember_me_on",
        //             "appName": "",
        //             "skipRCMSunsetCheck": false,
        //             "brandId": 1210,
        //             "prompt": "login sso",
        //             "display": "page",
        //             "clientId": "htPeaGLLSsy4ssTPpjCdtg",
        //             "appUrlScheme": "https://demo-ai-wi.lab.nordigy.ru/welcome/join",
        //             "state": "",
        //             "responseType": "code",
        //             "responseHint": "remember_me",
        //             "localeId": "en_US"
        //         }
        //     })
        //     console.log(await loginRequest.allHeaders());
        //     console.log(await loginRequest.json());
        //
        //     const consentRequest = await request.post('https://login.ringcentral.com/api/generate-code', {
        //         headers: {
        //             'Cookie': 'CLW_VERSION=22.2.3; PLA_SESSION=-576245123566681417; RCBRAND=1210; CSRFTOKEN=pWpf9pGv9LUuA9DEnucX6Wmn3ULqwRGR; s_cc=true; RCAuthSession=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJybFwiOmZhbHNlLFwicnRmXCI6ZmFsc2UsXCJyY1wiOnRydWUsXCJ1blwiOlwidmFsa2VhcmVAaW5ib3gucnVcIixcImFpZFwiOlwiMjk0NjMzNzAyMFwiLFwiZWlkXCI6XCIzMjIxMjkzMDIwXCIsXCJiaWRcIjpcIjEyMTBcIixcImN0XCI6XCJQYXNzd29yZFwiLFwiYXRcIjpcImV5SnJhV1FpT2lJNE56WXlaalU1T0dRd05UazBOR1JpT0RaaVpqVmpZVGszT0RBME56WXdPQ0lzSW5SNWNDSTZJa3BYVkNJc0ltRnNaeUk2SWxKVE1qVTJJbjAuZXlKemRXSWlPaUl6TWpJeE1qa3pNREl3SWl3aWFYTnpJam9pYUhSMGNITTZYQzljTDNCc1lYUm1iM0p0TG5KcGJtZGpaVzUwY21Gc0xtTnZiU0lzSW1sa2JHVmZkR2x0WlNJNk1UWTFOekEwT1RJeE15d2lZbkpoYm1SZmFXUWlPaUl4TWpFd0lpd2ljMmxrSWpvaU9EVmlNelZqTXprdFlqWTVOUzAwTmpZMExXSm1ObVl0Wmpaak5USXhaREl3TkRZd0lpd2lZWFZrSWpvaWVWQlNXVmxRVDBsUlVWZDVNMjlDY0ZKalVVbFJRU0lzSW1OeVpXUmxiblJwWVd4ZmRIbHdaU0k2SWxCaGMzTjNiM0prSWl3aVlXTmpiM1Z1ZEY5cFpDSTZJakk1TkRZek16Y3dNakFpTENKaGRYUm9YM1JwYldVaU9qRTJOVGN3TWpBME1UTXNJbWxoZENJNk1UWTFOekF5TURReE15d2ljMlZzWmw5emFXZHVaV1FpT21aaGJITmxMQ0pxZEdraU9pSTJOMlU0WVRVM055MHhabVEzTFRRME5qQXRZV1F5TnkxbU0yUmhNamRpWVdSbU9Ea2lmUS5XVU9YYVN1NjJHbkpRS0JoWC1XSW9mUWFWbkxZc0U3Mi1LY0dhUnNxWjFMX2wzaExzd1BmQWJOdVhCOWFNN0hjSWc0emJVUVduLTUxbkdJT3h0eVZ5aWUxNkhmV043X1ppZGRzX3pzUlM0SFphU1hhbW93TnlZYkZyNm42V2ZMYW9ud1RoZGVacWtyMXl1dFlfblVoSnBmNjFHTWxaaUM3ZWw2bzZfMWVZWFlKbTV6dk9FWHBpNVZWR2dtQlJSeXBhVkVCeXY4OFFkeXpnNDNGRVpMM1pkOXN2dG1zSzRzU05PblV5clk0V0ViWU9pQnUxZTVUTmRFdE5PandYTjhPNTlaTmNVdk04dUdGZ2V1V1VOdkJkSkRfQXhRbHppTFgzOXQ4TWVrRnh6T2RaY29CaEJNWUdqZDRzeTJDZktMMkZJN0hodnNXTGExbnkwOGxQd3lpdmdcIixcImFsXCI6dHJ1ZSxcInJ0cFwiOlwiY29kZVwiLFwic2NcIjpcIlwiLFwibGF0XCI6MTY1NzAyMDQxMzM5NyxcImdhXCI6ZmFsc2UsXCJjY1wiOlwiXCIsXCJjY21cIjpcIlwiLFwicGRcIjp0cnVlfSJ9.YaXCGLBa8RL07qAmfRb72ePJCBeklN5RqL8g-_dnxDE; s_sq=rc-4=%26pid%3DLoginViaEmail_UnifiedUI%26pidt%3D1%26oid%3Dfunctionsn()%257B%257D%26oidt%3D2%26ot%3DBUTTON',
        //             'CSRFTOKEN': 'pWpf9pGv9LUuA9DEnucX6Wmn3ULqwRGR',
        //             'Content-Type': 'application/json',
        //             'Accept': '*/*',
        //             'Accept-Encoding': 'gzip, deflate, br',
        //             'Connection': 'keep-alive'
        //         },
        //         data: {
        //             "clientId": "htPeaGLLSsy4ssTPpjCdtg",
        //             "appUrlScheme": "https://demo-ai-wi.lab.nordigy.ru/welcome/join",
        //         }
        //     })
        //     console.log(await consentRequest.json());
        //
        //     const consent2Request = await request.post('https://login.ringcentral.com/api/generate-code', {
        //         headers: {
        //             'Cookie': 'CLW_VERSION=22.2.3; PLA_SESSION=-576245123566681417; RCBRAND=1210; CSRFTOKEN=pWpf9pGv9LUuA9DEnucX6Wmn3ULqwRGR; s_cc=true; RCAuthSession=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJybFwiOmZhbHNlLFwicnRmXCI6ZmFsc2UsXCJyY1wiOnRydWUsXCJ1blwiOlwidmFsa2VhcmVAaW5ib3gucnVcIixcImFpZFwiOlwiMjk0NjMzNzAyMFwiLFwiZWlkXCI6XCIzMjIxMjkzMDIwXCIsXCJiaWRcIjpcIjEyMTBcIixcImN0XCI6XCJQYXNzd29yZFwiLFwiYXRcIjpcImV5SnJhV1FpT2lJNE56WXlaalU1T0dRd05UazBOR1JpT0RaaVpqVmpZVGszT0RBME56WXdPQ0lzSW5SNWNDSTZJa3BYVkNJc0ltRnNaeUk2SWxKVE1qVTJJbjAuZXlKemRXSWlPaUl6TWpJeE1qa3pNREl3SWl3aWFYTnpJam9pYUhSMGNITTZYQzljTDNCc1lYUm1iM0p0TG5KcGJtZGpaVzUwY21Gc0xtTnZiU0lzSW1sa2JHVmZkR2x0WlNJNk1UWTFOekEwT1RJeE15d2lZbkpoYm1SZmFXUWlPaUl4TWpFd0lpd2ljMmxrSWpvaU9EVmlNelZqTXprdFlqWTVOUzAwTmpZMExXSm1ObVl0Wmpaak5USXhaREl3TkRZd0lpd2lZWFZrSWpvaWVWQlNXVmxRVDBsUlVWZDVNMjlDY0ZKalVVbFJRU0lzSW1OeVpXUmxiblJwWVd4ZmRIbHdaU0k2SWxCaGMzTjNiM0prSWl3aVlXTmpiM1Z1ZEY5cFpDSTZJakk1TkRZek16Y3dNakFpTENKaGRYUm9YM1JwYldVaU9qRTJOVGN3TWpBME1UTXNJbWxoZENJNk1UWTFOekF5TURReE15d2ljMlZzWmw5emFXZHVaV1FpT21aaGJITmxMQ0pxZEdraU9pSTJOMlU0WVRVM055MHhabVEzTFRRME5qQXRZV1F5TnkxbU0yUmhNamRpWVdSbU9Ea2lmUS5XVU9YYVN1NjJHbkpRS0JoWC1XSW9mUWFWbkxZc0U3Mi1LY0dhUnNxWjFMX2wzaExzd1BmQWJOdVhCOWFNN0hjSWc0emJVUVduLTUxbkdJT3h0eVZ5aWUxNkhmV043X1ppZGRzX3pzUlM0SFphU1hhbW93TnlZYkZyNm42V2ZMYW9ud1RoZGVacWtyMXl1dFlfblVoSnBmNjFHTWxaaUM3ZWw2bzZfMWVZWFlKbTV6dk9FWHBpNVZWR2dtQlJSeXBhVkVCeXY4OFFkeXpnNDNGRVpMM1pkOXN2dG1zSzRzU05PblV5clk0V0ViWU9pQnUxZTVUTmRFdE5PandYTjhPNTlaTmNVdk04dUdGZ2V1V1VOdkJkSkRfQXhRbHppTFgzOXQ4TWVrRnh6T2RaY29CaEJNWUdqZDRzeTJDZktMMkZJN0hodnNXTGExbnkwOGxQd3lpdmdcIixcImFsXCI6dHJ1ZSxcInJ0cFwiOlwiY29kZVwiLFwic2NcIjpcIlwiLFwibGF0XCI6MTY1NzAyMDQxMzM5NyxcImdhXCI6ZmFsc2UsXCJjY1wiOlwiXCIsXCJjY21cIjpcIlwiLFwicGRcIjp0cnVlfSJ9.YaXCGLBa8RL07qAmfRb72ePJCBeklN5RqL8g-_dnxDE; s_sq=rc-4=%26pid%3DLoginViaEmail_UnifiedUI%26pidt%3D1%26oid%3Dfunctionsn()%257B%257D%26oidt%3D2%26ot%3DBUTTON',
        //             'CSRFTOKEN': 'pWpf9pGv9LUuA9DEnucX6Wmn3ULqwRGR',
        //             'Content-Type': 'application/json',
        //             'Accept': '*/*',
        //             'Accept-Encoding': 'gzip, deflate, br',
        //             'Connection': 'keep-alive'
        //         },
        //         data: {
        //             "clientId": "htPeaGLLSsy4ssTPpjCdtg",
        //             "appUrlScheme": "https://demo-ai-wi.lab.nordigy.ru/welcome/join",
        //         }
        //     })
        //     console.log(await consent2Request.json());
        //
        // })
        test('Empty test for check', async ({request}) => {
            const consentRequest = await request.post('https://login.ringcentral.com/api/generate-code', {
                headers: {
                    'CSRFTOKEN': token,
                    'Cookie': cookie
                },
                data: {
                    "clientId": loginData.CLIENTID,
                    "appUrlScheme": loginData.URL_JOIN_DEMO
                }
            })
            console.log(await consentRequest.json());
        })




});

