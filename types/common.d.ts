interface ObjTy {
    [propName: string]: any
}

/* axiosReq请求配置*/
import { AxiosRequestConfig } from 'axios'

interface AxiosReqTy extends AxiosRequestConfig {
    url?: string
    method?: string
    data?: ObjTy
    isParams?: boolean
    bfLoading?: boolean
    afHLoading?: boolean
    isUploadFile?: boolean
    isDownLoadFile?: boolean
    isAlertErrorMsg?: boolean
    baseURL?: string
    timeout?: number
}
interface AxiosConfigTy {
    url?: string
    method?: string
    data?: ObjTy
    isParams?: boolean
    bfLoading?: boolean
    afHLoading?: boolean
    isUploadFile?: boolean
    isDownLoadFile?: boolean
    isAlertErrorMsg?: boolean
    baseURL?: string
    timeout?: number
}
