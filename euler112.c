#include  <stdio.h>
#include  <math.h>


typedef unsigned int uint;
typedef unsigned int BOOL;

#define TRUE 1
#define FALSE 0

uint NumDigits(unsigned int val)
{
	int digits = 0;
	if(0 == val)
	{
		return val;
	}
	while(val)
	{

	}
}

uint GetDigit(int digidx)
{

}

BOOL IsIncreasing(uint val)
{
	if(val <= 99)
	{
		return TRUE;
	}

	uint dig = val%10;
	val = val/10;
	uint prevdig = val%10;
	val = val/10;

	//printf("%d %d",dig,prevdig);

	while(val || prevdig)
	{
		if(prevdig > dig)
		{
			//printf("%d > %d -> not increasing\n",prevdig,dig);
			return FALSE;	
		}
		dig = prevdig;
		prevdig = val%10;
		val = val/10;
	}

	return TRUE;
}

BOOL IsDecreasing(uint val)
{
	if(val <= 99)
	{
		return TRUE;
	}

	uint dig = val%10;
	val = val/10;
	uint prevdig = val%10;
	val = val/10;

	//printf("%d %d",dig,prevdig);

	while(val || prevdig)
	{
		if(prevdig < dig)
		{
			//printf("%d < %d -> not decreasing\n",prevdig,dig);
			return FALSE;	
		}
		dig = prevdig;
		prevdig = val%10;
		val = val/10;
	}

	return TRUE;
}


BOOL CheckDigits(uint val, BOOL checkIncreasing)
{
	printf("CheckDigits: val: %d\n",val);
	if (val < 100)
	{
		return FALSE;
	}

	uint dig = val%10;
	val = val/10;
	uint prevdig = val%10;
	val = val/10;

	while(val)
	{
		printf("%d",dig);
		if(checkIncreasing)
		{
			if (prevdig > dig) 
			{
				return FALSE;
			}
		}
		else
		{
			if(prevdig < dig)
			{
				return FALSE;
			}
		}
		dig = prevdig;
		prevdig = val%10;
		val = val/10;
		//printf(" %d",dig);
	}
	return TRUE;
}



int main()
{
	const int max = 1000;
	int found = 0;
	int val = 0;
	while(val < max)
	{
		if(IsIncreasing(val) || IsDecreasing(val))
		{
			//printf("Increasing or Decreasing: %d\n",val);
		}
		else
		{
			found++;
		}
		val++;
	}


	printf("Found %d bouncy out of %d\n",found,max);
	return 0;

}