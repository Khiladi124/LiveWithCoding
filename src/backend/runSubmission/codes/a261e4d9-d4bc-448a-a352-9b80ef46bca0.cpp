#include<bits/stdc++.h>
using namespace std;
 int main()
 {
    string s;
    cin>>s;
    int i=0,j=s.size()-1;
    while(i<j)
    {
        if(s[i++]!=s[j--])
        {
            cout<<"false";
            return 0;
        }
    }
    cout<<"true";
    return 0;
 }