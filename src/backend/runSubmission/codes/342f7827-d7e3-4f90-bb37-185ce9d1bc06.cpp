#include<bits/stdc++.h>
using namespace std;
int main()
{
    int n;
    cin>>n;
    int ans=0;
    for(int i=0;i<n;i++)
    {
        int u;
        cin>>u;
        if((abs(u))%2)ans++;
    }
    cout<<ans;
    return 0;
}