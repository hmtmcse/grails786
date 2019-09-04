import {TRListData, TRListDataHelper} from "react-mui-ui/ui/tr-ui-data";
import {
    AccountBoxIcon,
    AddShoppingCartIcon,
    AssignmentIcon, BarChartIcon,
    ContactsIcon, DashboardIcon, PeopleIcon,
    ReportIcon,
    RowingIcon
} from "react-mui-ui/ui/ui-component";

export default class AppNavigation {


    private static setAction(route: any, url: string) {
        return {
            click(event: any, onClickData: any): void {
                route.history.push(url);
            }
        }
    }

    public static getNavigation(route: any): Array<TRListData> {
        let nav: TRListDataHelper = TRListDataHelper.start("dashboard", "Dashboard", DashboardIcon, this.setAction(route, "/dashboard"));
        nav.add("suspects", "Suspects", AssignmentIcon);
        nav.add("opportunities", "Opportunities", AddShoppingCartIcon);
        nav.add("accounts", "Accounts", PeopleIcon);
        nav.add("contacts", "Contacts", ContactsIcon);
        nav.add("users", "Users", RowingIcon, this.setAction(route, "/user"));
        nav.add("reports", "Reports", BarChartIcon);
        return nav.getList();
    }
}