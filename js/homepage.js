

// FOr Alliance color
    function setcolor_alliance(party)
    {    
        var colorSet = 'none';
       
        if(party == 'NDA'){
            colorSet='#C47451';
        }
         
        if(party == 'UPA'){
            colorSet='#95B9C7';
        }
        if(party == 'THIRD FRONT'){
            colorSet='#BCC6CC';
        }
         
       
        if(party == 'Others')
        {
            colorSet='#6DCFF6';
        }
        if(party == 'OTHERS')
        {
            colorSet='#FFE4B5';
        }

        if(colorSet == 'none'){
            var colorSet =get_random_color();
        }
        return colorSet;
    }


function setcolor(party){
    
        var colorSet = 'none';
        if(party == 'INC')
        {
            colorSet='#008000';
        }
        if(party == 'BJP')
        {
            colorSet='#E56717';
        }
        //        if(party == 'TDP')
        //        {
        //            colorSet ='#87CEEB';
        //        }
        if(party == 'NDA'){
            colorSet='#E56717';
        }
         
        if(party == 'UPA'){
            colorSet='#2E2EFE';
        }
        if(party == 'THIRD FRONT'){
            colorSet='#CCFF00';
        }
         
        if(party == 'TDP'){
            colorSet ='#FFCCFF';
        }
        if(party  == 'TRS')
        {
            colorSet='#9ACD32';
        }
        if(party == 'AIMIM')
        {
            colorSet='#A0522D';
        }
        if(party== 'AITC')
        {
            colorSet='#ADD8E6';
        }
        if(party == 'CPI')
        {
            colorSet='#DC143C';

        }
        if(party == 'Others')
        {
            colorSet='#6DCFF6';

        }
        if(party == 'OTH')
        {
            colorSet='#6DCFF6';

        }
        if(party == 'OTHERS')
        {
            colorSet='#6DCFF6';

        }
        if(party == 'CPM')
        {
            colorSet ='#8B0000';

        }
        if(party == 'SP')
        {
            colorSet='#F08080';

        }
        if(party == 'JDU')
        {
            colorSet='#B8860B';

        }

        if(party == 'JKN')
        {
            colorSet='#00FF7F';

        }
        if(party == 'JKDP')
        {
            colorSet='#FFD700';

        }
        if(party == 'BSP')
        {
            colorSet='#2E2EFE';

        }
        if(party == 'JD(U)')
        {
            colorSet='#FFCC00';

        }
        if(party == 'JD')
        {
            colorSet='#81B298';

        }
        if(party == 'RJD')
        {
            colorSet='#BDB76B';

        }
        if(party == 'SAP')
        {
            colorSet='#FFD700';

        }
        if(party == 'JNP')
        {
            colorSet='#E18B6B';

        }
        if(party== "NCO")
        {
            colorSet='#E18B6B';

        }
        if(party == 'SWA')
        {
            colorSet='#ECD672';

        }
        if(party== "NCP")
        {
            colorSet='#00FF00';

        }
        if(party == 'PPA')
        {
            colorSet='#808000';

        }
        if(party== "IND")
        {
            colorSet='#696565';

        }
        if(party == 'INC(U)')
        {
            colorSet ='#00FF00';

        }
        if(party == 'MAG')
        {
            colorSet='#806D7E';

        }
        if(party== "ADMK")
        {
            colorSet='#66CC99';

        }
        if(party == "PRAP")
        {
            colorSet='#CCFF00';

        }
        if(party== 'INC(I)')
        {
            colorSet='#31B404';

        }


        if (party == "ST")  { colorSet = '#830302'; }
        if (party == "GEN") { colorSet = '#FF7F0E'; }
        if (party == 'SC')  { colorSet = '#2E2EFE'; }

        if(colorSet == 'none'){
            var colorSet =get_random_color();
        }

        return colorSet;

    }

