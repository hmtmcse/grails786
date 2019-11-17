import TRComponentState from "tm-react/src/artifacts/component/tr-component-state";
import SystemConfig from "./system-config";
import {AppConstant} from "./app-constant";


export const ApiUtil = {

    getResponseData: (response: any) => {
        const {isSuccess, responseData} = response;
        if (responseData && isSuccess) {
            return responseData
        }
        return undefined
    },

    search(event: any, component: any, searchKey: string[]) {
        if (event.keyCode === AppConstant.pressEnter) {
            if (searchKey) {
                let search: { [key: string]: any } = {};
                searchKey.forEach((value) => {
                    search[value] = "%" + event.target.value + "%";
                });
                component.state.queryCondition["search"] = search;
            }
            if (component.loadData) {
                component.loadData();
            }
        }
    },

    makeGetRequestUrl: (baseUrl: string, ...queryParams: Array<{key: string, value: string}>) => {
        let url = baseUrl;

        if(queryParams) {
            url = url.concat("?", queryParams[0].key, "=", queryParams[0].value);
            queryParams.shift();
        }

        queryParams.forEach((item: {key: string, value: string})=>{
            url = url.concat("&",item.key,"=",item.value)
        });

        return url;
    },
    sortAndPagination: (field: string, order: string) =>{
        let sort: { [key: string]: any } = {};
        if (field && order) {
            sort =  {
                order: {[field] : order}
            };
        }
        return sort;
    },
    getSortAndPaginationData: (state: TRComponentState) => {
        let sortAndPagination: { [key: string]: any } = {
            offset: state.itemOffset,
            max: state.maxItem,
            where: ApiUtil.sortAndPagination(state.orderBy, state.sortDirection)
        };
        if (state.queryCondition["search"]){
            sortAndPagination["where"]["or"] = {};
            sortAndPagination["where"]["or"]["like"] = state.queryCondition["search"]
        }
        return sortAndPagination;
    },

    resetSearchAndPagination: (component: any) => {
        component.state.queryCondition = {};
        component.state.pageOffset = 0;
        component.state.itemPerPage = SystemConfig.itemPerPage();
        component.state.itemOffset = 0;
    },

    paginationManager(component: any, loadAgain: any) {
        return {
            itemPerPage: component.state.maxItem,
            page: component.state.pageOffset,
            total: component.state.totalItem,
            itemPerPageDropdown: SystemConfig.itemPerPageDropdown(),
            trPaginationAction: {
                onChangeItemPerPage(event: any): void {
                    ApiUtil.resetSearchAndPagination(component);
                    component.setState(
                        {
                            maxItem: event.target.value,
                        }, () => {
                            loadAgain();
                        });
                },
                nextPrevious(event: any, offset: number): void {
                    component.setState({
                        itemOffset: component.state.maxItem * offset,
                        pageOffset: offset
                    }, () => {
                        loadAgain();
                    });
                }
            },
        }
    }

};